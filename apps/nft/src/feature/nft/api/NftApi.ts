import abi from './erc721Abi';
import { NftApi, NftPage, NftInstance } from './types';
import { ethers } from 'ethers';
import axios from 'axios';

async function getTokenIds(contract: ethers.Contract, account: string) {
  const balance = await contract.balanceOf(account);
  const result = [];
  for (let i = 0; i < balance.toNumber(); i++) {
    result.push((await contract.tokenOfOwnerByIndex(account, i)).toString());
  }
  return result;
}

async function getTokensMetadata(
  contract: ethers.Contract,
  tokenIds: Array<string>
): Promise<Array<{ tokenId: string, metadataUrl: string }>> {
  return Promise.all(tokenIds.map(async tokenId => ({ tokenId, metadataUrl: (await contract.tokenURI(tokenId)) })));
}

export const createNftApi: (toolkit: ethers.providers.Provider) => NftApi = (toolkit) => {
  return {
    async fetchUserNftInstances(nftAddress: string, userAddress: string, cursor?: string): Promise<NftPage> {
      const contract = new ethers.Contract(
        nftAddress,
        abi,
        toolkit
      );
      const tokenIds = await getTokenIds(contract, userAddress);
      const metadatas = await getTokensMetadata(contract, tokenIds);
      const metadataContent = metadatas
        .map(({tokenId, metadataUrl,  }) => axios.get(metadataUrl).then(({ data }) => ({id: tokenId, name: data.name, description: data.description, thumbnailUri: data.image, attributes: [] })));
      return Promise.all(metadataContent).then(pages => ({ collection: nftAddress, results: pages }));
    }
  };
};