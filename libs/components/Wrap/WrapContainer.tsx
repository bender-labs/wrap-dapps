import { CardContent, Container } from '@material-ui/core';
import MultiConnect from '../wallet/MultiConnect';
import LoadableButton from '../button/LoadableButton';

import { Token } from '../token/type';
import { HalfCard } from '../Card';
import EthereumTokenSelection from './Cards/EthereumTokenSelection';
import Gallery from '../gallery/Gallery';
import { white } from '../theme/theme';

export type WrapContainerProps = {
  connected: boolean;
  disabled: boolean;
};



export const WrapContainer = ({ connected, disabled }: WrapContainerProps) => {
  connected = false;
  if(!connected) {
    disabled = true;
  }

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

  return (
    <div>
      <Container sx={{ paddingBottom: 3 }}>

        <HalfCard>
          <CardContent>
            {!connected && (
              <MultiConnect />
            )}

            <EthereumTokenSelection
              disabled={disabled}
              onTokenChange={() => {}}
              token={tokens['SOR']}
              tokens={tokens}
            />
          </CardContent>
        </HalfCard>
      </Container>
      <Container maxWidth={'lg'} sx={{ padding: 3 }}>
        <Gallery />
      </Container>
    </div>
  );
}
