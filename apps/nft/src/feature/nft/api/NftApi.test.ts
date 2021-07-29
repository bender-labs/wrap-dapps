import { ethers } from 'ethers';
import { createNftApi } from './NftApi';

test('do stuff', async () => {
  const userAddressWithTokens = "0xECB2d6583858Aae994F4248f8948E35516cfc9cF";
  const jbIsTopDogContractAddress = "0x55cb8f57363a0549899696e17d716a2654680db1";
  const rpcProvider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/1915fb285d0747d9af84c7e106fdb443");

  const nftApi = createNftApi(rpcProvider);

  const result = await nftApi.fetchUserNftInstances(jbIsTopDogContractAddress, userAddressWithTokens)

  expect(result).toEqual("")
})