import { CardContent, Container } from '@material-ui/core';
import {
  MultiConnect,
  HalfCard,
  EthereumTokenSelection,
  useEthereumWalletContext,
  useTezosWalletContext,
  TezosStateType,
  EthereumStateType,
  useNonFungibleTokens
} from '@wrap-dapps/components';
import Gallery from './Gallery';
import { useEffect, useState } from 'react';
import { useClientNtfBalance } from './hook/useClientNtfBalance';
import { ethers } from 'ethers';
import { createNftApi } from './api/NftApi';
import { NftInstance } from './api/types';

type ConnectedWrapContainerProps = {
  ethereumToolkit: ethers.providers.Provider;
  userAddress: string
}

// async function getData() {
//   const userAddressWithTokens = '0x7d86457D26205b7DCA5C4ab5d83FBf3A91C6e30d';
//   const jbIsTopDogContractAddress = '0x55cb8f57363a0549899696e17d716a2654680db1';
//   const rpcProvider = new ethers.providers.JsonRpcProvider(process.env.RAZZLE_ETH_RPC!);
//   // console.log(`rpcProvider : ${rpcProvider}`)
//
//   const nftApi = createNftApi(rpcProvider);
//   // console.log(`nftApi: ${JSON.stringify(nftApi)}`);
//
//   const result = await nftApi.fetchUserNftInstances(jbIsTopDogContractAddress, userAddressWithTokens);
//   // console.log(`result: ${JSON.stringify(result)}`
//   const { results } = result;
//   console.log(results);
//   return results;
// }

function ConnectedWrapContainer(props: ConnectedWrapContainerProps) {
  // let data = getData()
  const nonFungibleTokens = useNonFungibleTokens();
  const [selectedToken, setSelectedToken] = useState(nonFungibleTokens[Object.keys(nonFungibleTokens)[0]]);
  const userTokens = useClientNtfBalance({
    address: props.userAddress,
    nftAddress: selectedToken.ethereumContractAddress,
    ethereumToolkit: props.ethereumToolkit
  });
  // console.log(data)


  return <>
    <EthereumTokenSelection
      onTokenChange={(tokenId) => {
        setSelectedToken(nonFungibleTokens[tokenId]);
      }}
      token={selectedToken}
      tokens={nonFungibleTokens}
    />
    {selectedToken && (
      <Container maxWidth={'lg'} sx={{ padding: 3 }}>
        <Gallery />
      </Container>
    )}
  </>;
}

export const WrapContainer = () => {
  const { state: tzState } = useTezosWalletContext();
  const { state: ethState } = useEthereumWalletContext();

  const [connected, setConnected] = useState(false);


  useEffect(() => {
    setConnected(
      tzState.type === TezosStateType.CONNECTED &&
      ethState.type === EthereumStateType.CONNECTED
    );
  }, [tzState, ethState]);

  return (
    <div>
      <Container sx={{ paddingBottom: 3 }}>
        <HalfCard>
          <CardContent>
            {!connected && <MultiConnect />}

            {/*<TokenSelection*/}
            {/*  token={tokens['SOR'].ethereumSymbol}*/}
            {/*  disabled={!connected}*/}
            {/*  onTokenSelect={onTokenChange}*/}
            {/*  blockchainTarget={SupportedBlockchain.Ethereum}*/}
            {/*  tokens={tokens} />*/}
            {ethState.type === EthereumStateType.CONNECTED && <ConnectedWrapContainer
              ethereumToolkit={ethState.ethereumToolkit}
              userAddress={ethState.ethereumAccount}
            />}

          </CardContent>
        </HalfCard>
      </Container>

    </div>
  );
};
