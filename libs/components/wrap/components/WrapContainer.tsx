import { CardContent, Container } from '@material-ui/core';
import MultiConnect from '../../wallet/MultiConnect';
import { HalfCard } from '../../Card';
import EthereumTokenSelection from './cards/EthereumTokenSelection';
import Gallery from '../../gallery/Gallery';
import { useEthereumWalletContext, useTezosWalletContext } from '../../wallet';
import { useEffect, useState } from 'react';
import { TezosStateType } from '../../wallet/tezos/state';
import { EthereumStateType } from '../../wallet/ethereum/state';
import { useNonFungibleTokens } from '../../configuration';

export const WrapContainer = () => {
  const { state: tzState } = useTezosWalletContext();
  const { state: ethState } = useEthereumWalletContext();
  const nonFungibleTokens = useNonFungibleTokens();
  const [connected, setConnected] = useState(false);

  const [selectedToken, setSelectedToken] = useState(nonFungibleTokens[Object.keys(nonFungibleTokens)[0]]);

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

            <EthereumTokenSelection
              disabled={!connected}
              onTokenChange={(tokenId) => {
                setSelectedToken(nonFungibleTokens[tokenId]);
              }}
              token={selectedToken}
              tokens={nonFungibleTokens}
            />
          </CardContent>
        </HalfCard>
      </Container>
      {connected && selectedToken && (
        <Container maxWidth={'lg'} sx={{ padding: 3 }}>
          <Gallery />
        </Container>
      )}
    </div>
  );
};
