import abi from './erc721Abi';
import { Cursor, EthereumNftApi, NftInstance, NftPage } from './types';
import { ethers } from 'ethers';
import axios from 'axios';
import { NonFungibleToken } from '@wrap-dapps/api';

async function getTokenIds(contract: ethers.Contract, account: string, cursor?: Cursor) {
  const balance = await contract.balanceOf(account);
  const result = [];
  const firstTokenToGet = cursor ? cursor.offset : 0;
  const lastTokenToGet = cursor ? Math.min(cursor.offset + cursor.limit, balance.toNumber()) : balance.toNumber();
  for (let i = firstTokenToGet; i < lastTokenToGet; i++) {
    result.push((await contract.tokenOfOwnerByIndex(account, i)).toString());
  }
  return { total: balance.toNumber(), result };
}

async function getTokensMetadata(
  contract: ethers.Contract,
  tokenIds: Array<string>
): Promise<Array<{ tokenId: string, metadataUrl: string }>> {
  return Promise.all(tokenIds.map(async tokenId => (await getTokenMetadata(contract, tokenId))));
}

async function getTokenMetadata(contract: ethers.Contract, tokenId: string): Promise<{ tokenId: string, metadataUrl: string }> {
  return { tokenId, metadataUrl: await contract.tokenURI(tokenId) };
}

function ipfsUrlToHttpsUrl(url: string): string {
  if (url.startsWith('ipfs://')) {
    return `https://ipfs.io/ipfs/${url.replace('ipfs://', '')}`;
  }
  return url;
}

async function fetchMetadata(url: string, indexerUrl: string): Promise<any> {
  if (url.startsWith('ipfs://')) {
    const metadata = await axios.get(`https://ipfs.io/ipfs/${url.replace('ipfs://', '')}`);
    return metadata.data;
  }
  const metadata = await axios.get(`${indexerUrl}/nfts/metadata-proxy?url=${url}`);
  return metadata.data;
}

export const createEthereumNftApi: (toolkit: ethers.providers.Provider) => EthereumNftApi = (toolkit) => {
  return {
    async fetchNftTokenMetadata(nftCollection: NonFungibleToken, tokenId: string, indexerUrl: string): Promise<NftInstance> {
      const contract = new ethers.Contract(
        nftCollection.ethereumContractAddress,
        abi,
        toolkit
      );
      const metadataInfos = await getTokenMetadata(contract, tokenId);
      const data = await fetchMetadata(metadataInfos.metadataUrl, indexerUrl);
      return {
        id: tokenId,
        name: data.name ? data.name : tokenId,
        description: data.description,
        thumbnailUri: ipfsUrlToHttpsUrl(data.image),
        attributes: [],
        nftCollection: nftCollection
      };
    },
    async fetchNftTokensWithMetadata(nftCollection: NonFungibleToken, userAddress: string, indexerUrl: string, cursor?: Cursor): Promise<NftPage> {
      const contract = new ethers.Contract(
        nftCollection.ethereumContractAddress,
        abi,
        toolkit
      );
      const tokenIds = await getTokenIds(contract, userAddress, cursor);
      const metadataInfos = await getTokensMetadata(contract, tokenIds.result);
      const metadataContents = metadataInfos
        .map(({ tokenId, metadataUrl }) => {
          return fetchMetadata(metadataUrl, indexerUrl)
            .then((data): NftInstance => ({
                id: tokenId,
                name: data.name ? data.name : tokenId,
                description: data.description,
                thumbnailUri: ipfsUrlToHttpsUrl(data.image),
                attributes: [],
                nftCollection: nftCollection
              })
            );
        });
      return Promise.all(metadataContents).then(nftInstances => ({
        collection: nftCollection.ethereumContractAddress,
        results: nftInstances,
        total: tokenIds.total
      }));
    }
  };
};