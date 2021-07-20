import { CardContent, Container } from '@material-ui/core';
import MultiConnect from '../wallet/MultiConnect';
import LoadableButton from '../button/LoadableButton';

import { Token } from '../token/type';
import { HalfCard } from '../Card';
import EthereumTokenSelection from './Cards/EthereumTokenSelection';

export type WrapContainerProps = {
  connected: boolean;
};

export const WrapContainer = ({ connected }: WrapContainerProps) => {
  connected = false;
  const tokens: Record<string, Token> = {
    SOR: {
      token: 'SOR',
      type: 'ERC721',
      ethereumName: 'blabla',
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
    <Container>
      <HalfCard>
        <CardContent>
          <MultiConnect />

          <EthereumTokenSelection
            onTokenChange={() => {}}
            token={tokens['SOR']}
            tokens={tokens}
          />
        </CardContent>
      </HalfCard>
    </Container>
  );
};
