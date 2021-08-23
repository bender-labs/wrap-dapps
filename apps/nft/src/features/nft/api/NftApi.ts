import abi from './erc721Abi';
import { Cursor, NftApi, NftInstance, NftPage } from './types';
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

export const createNftApi: (toolkit: ethers.providers.Provider) => NftApi = (toolkit) => {
  return {
    async fetchUserNftToken(nftCollection: NonFungibleToken, tokenId: string): Promise<NftInstance> {
      const contract = new ethers.Contract(
        nftCollection.ethereumContractAddress,
        abi,
        toolkit
      );
      const metadataInfos = await getTokenMetadata(contract, tokenId);
      return await axios.get(metadataInfos.metadataUrl).then(({ data }): NftInstance => ({
        id: tokenId,
        name: data.name,
        description: data.description,
        thumbnailUri: data.image,
        attributes: [],
        nftCollection: nftCollection
      }));
    },
    async fetchUserNftTokens(nftCollection: NonFungibleToken, userAddress: string, cursor?: Cursor): Promise<NftPage> {
      const contract = new ethers.Contract(
        nftCollection.ethereumContractAddress,
        abi,
        toolkit
      );
      const tokenIds = await getTokenIds(contract, userAddress, cursor);
      const metadataInfos = await getTokensMetadata(contract, tokenIds.result);
      const metadataContents = metadataInfos
        .map(({ tokenId, metadataUrl }) => axios.get(metadataUrl).then(({ data }): NftInstance => ({
          id: tokenId,
          name: data.name,
          description: data.description,
          thumbnailUri: data.image,
          attributes: [],
          nftCollection: nftCollection
        })));
      return Promise.all(metadataContents).then(nftInstances => ({
        collection: nftCollection.ethereumContractAddress,
        results: nftInstances,
        total: tokenIds.total
      }));
    }
  };
};