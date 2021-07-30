import abi from './erc721Abi';
import { NftApi, NftPage, NftInstance, Cursor } from './types';
import { ethers } from 'ethers';
import axios from 'axios';

async function getTokenIds(contract: ethers.Contract, account: string, cursor?: Cursor) {
  const balance = await contract.balanceOf(account);
  const result = [];
  let firstTokenToGet = cursor ? cursor.offset : 0;
  let lastTokenToGet = cursor ? cursor.offset + cursor.limit : balance.toNumber();
  for (let i = firstTokenToGet; i < lastTokenToGet; i++) {
    result.push((await contract.tokenOfOwnerByIndex(account, i)).toString());
  }
  return {total: balance.toNumber(), result};
}

async function getTokensMetadata(
  contract: ethers.Contract,
  tokenIds: Array<string>
): Promise<Array<{ tokenId: string, metadataUrl: string }>> {
  return Promise.all(tokenIds.map(async tokenId => ({ tokenId, metadataUrl: (await contract.tokenURI(tokenId)) })));
}

export const createNftApi: (toolkit: ethers.providers.Provider) => NftApi = (toolkit) => {
  return {
    async fetchUserNftInstances(nftAddress: string, userAddress: string, cursor?: Cursor): Promise<NftPage> {
      const contract = new ethers.Contract(
        nftAddress,
        abi,
        toolkit
      );
      const tokenIds = await getTokenIds(contract, userAddress, cursor);
      const metadatas = await getTokensMetadata(contract, tokenIds.result);
      const metadataContent = metadatas
        .map(({tokenId, metadataUrl,  }) => axios.get(metadataUrl).then(({ data }) => ({id: tokenId, name: data.name, description: data.description, thumbnailUri: data.image, attributes: [] })));
      return Promise.all(metadataContent).then(pages => ({ collection: nftAddress, results: pages, total: tokenIds.total }));
    }
  };
};