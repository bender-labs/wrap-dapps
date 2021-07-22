import { CardContent, Container } from '@material-ui/core';
import MultiConnect from '../../wallet/MultiConnect';
import { Token, TokenMetadata } from '../../token/type';
import { HalfCard } from '../../Card';
import EthereumTokenSelection from './cards/EthereumTokenSelection';
import Gallery from '../../gallery/Gallery';
import { useEthereumWalletContext, useTezosWalletContext } from '../../wallet';
import { useEffect, useState } from 'react';
import { TezosStateType } from '../../wallet/tezos/state';
import { EthereumStateType } from '../../wallet/ethereum/state';
import TokenSelection from '../../token/TokenSelection';
import { SupportedBlockchain } from '../../wallet/blockchain';


const tokens: Record<string, Token> = {
  SOR: {
    token: 'SOR',
    type: 'ERC721',
    ethereumName: 'SORARE',
    ethereumSymbol: 'SOR',
    ethereumContractAddress: 'address',
    decimals: 1,
    tezosWrappingContract: 'string',
    tezosTokenId: 1,
    tezosSymbol: 'string',
    tezosName: 'string',
    thumbnailUri: 'https://info.tzwrap.com/icons/WRAP.png',
  },
  SEA: {
    token: 'SEA',
    type: 'ERC721',
    ethereumName: 'SEAN IS GREAT',
    ethereumSymbol: 'SEA',
    ethereumContractAddress: 'address',
    decimals: 1,
    tezosWrappingContract: 'string',
    tezosTokenId: 1,
    tezosSymbol: 'string',
    tezosName: 'string',
    thumbnailUri: 'https://info.tzwrap.com/icons/WRAP.png',
  },
  SIN: {
    token: 'SIN',
    type: 'ERC721',
    ethereumName: 'SINAZO IS GREAT',
    ethereumSymbol: 'SIN',
    ethereumContractAddress: 'address',
    decimals: 1,
    tezosWrappingContract: 'string',
    tezosTokenId: 1,
    tezosSymbol: 'string',
    tezosName: 'string',
    thumbnailUri: 'https://info.tzwrap.com/icons/WRAP.png',
  },
};

export const WrapContainer = () => {
  const { state: tzState } = useTezosWalletContext();
  const { state: ethState } = useEthereumWalletContext();
  const [connected, setConnected] = useState(false);

  const [selectedToken, setSelectedToken] = useState(tokens['SOR'])

  useEffect(() => {
    setConnected(tzState.type === TezosStateType.CONNECTED
      && ethState.type === EthereumStateType.CONNECTED);
  }, [tzState, ethState]);



  return (
    <div>
      <Container sx={{ paddingBottom: 3 }}>

        <HalfCard>
          <CardContent>
            {!connected && (
              <MultiConnect />
            )}

            {/*<TokenSelection*/}
            {/*  token={tokens['SOR'].ethereumSymbol}*/}
            {/*  disabled={!connected}*/}
            {/*  onTokenSelect={onTokenChange}*/}
            {/*  blockchainTarget={SupportedBlockchain.Ethereum}*/}
            {/*  tokens={tokens} />*/}

            <EthereumTokenSelection
              disabled={!connected}
              onTokenChange={tokenId => {setSelectedToken(tokens[tokenId])}}
              token={selectedToken}
              tokens={tokens}
            />
          </CardContent>
        </HalfCard>
      </Container>
      {
        (connected && selectedToken) && (
          <Container maxWidth={'lg'} sx={{ padding: 3 }}>
            <Gallery />
          </Container>
        )
      }

    </div>
  );
}
