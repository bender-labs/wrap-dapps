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

type ConnectedWrapContainerProps = {
  ethereumToolkit: ethers.providers.Provider;
  userAddress: string
}

function ConnectedWrapContainer(props: ConnectedWrapContainerProps) {
  const nonFungibleTokens = useNonFungibleTokens();
  const [selectedToken, setSelectedToken] = useState(nonFungibleTokens[Object.keys(nonFungibleTokens)[0]]);
  const userTokens = useClientNtfBalance({
    address: props.userAddress,
    nftAddress: selectedToken.ethereumContractAddress,
    ethereumToolkit: props.ethereumToolkit
  });
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
