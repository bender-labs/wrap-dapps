import { ethers } from 'ethers';
import { createNftApi } from './NftApi';

test('should get users token and metadata', async () => {
  const userAddressWithTokens = '0x7d86457D26205b7DCA5C4ab5d83FBf3A91C6e30d';
  const jbIsTopDogContractAddress = '0x55cb8f57363a0549899696e17d716a2654680db1';
  const rpcProvider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/1915fb285d0747d9af84c7e106fdb443');

  const nftApi = createNftApi(rpcProvider);

  const result = await nftApi.fetchUserNftInstances(jbIsTopDogContractAddress, userAddressWithTokens);

  const expected = [{
    id: '27',
    thumbnailUri: 'https://nfts-api.testnet.tzwrap.com/JB/27/image',
    name: 'JB 27',
    description: 'It reveals your hidden power, and stamina. It guides, and protects you, but at the same time it reminds you to seek peace, and protect your freedom.',
    attributes: []
  }, {
    id: '28',
    thumbnailUri: 'https://nfts-api.testnet.tzwrap.com/JB/28/image',
    name: 'JB 28',
    description: 'It reveals your hidden power, and stamina. It guides, and protects you, but at the same time it reminds you to seek peace, and protect your freedom.',
    attributes: []

  }, {
    id: '29',
    thumbnailUri: 'https://nfts-api.testnet.tzwrap.com/JB/29/image',
    name: 'JB 29',
    description: 'It reveals your hidden power, and stamina. It guides, and protects you, but at the same time it reminds you to seek peace, and protect your freedom.',
    attributes: []

  }, {
    id: '30',
    thumbnailUri: 'https://nfts-api.testnet.tzwrap.com/JB/30/image',
    name: 'JB 30',
    description: 'It reveals your hidden power, and stamina. It guides, and protects you, but at the same time it reminds you to seek peace, and protect your freedom.',
    attributes: []
  }];
  expect(result).toEqual({ collection: jbIsTopDogContractAddress, results: expected });
});