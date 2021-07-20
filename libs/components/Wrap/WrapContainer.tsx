import { Box, Container, Typography } from '@material-ui/core';
import TabsCard from './Cards/TabsCard';
import NextCard from './Cards/NextCard'
import InputCard from './Cards/InputCard'
import { EthereumConnectionButton, TezosConnectionButton } from '../wallet';
import MultiConnect from '../wallet/MultiConnect';
import { Token } from '../token/type';

export type WrapContainerProps = {
  connected: boolean;
};

export const WrapContainer = ({ connected }: WrapContainerProps) => {
  connected = false;
  const tokens: Record<string, Token> = {
      'SOR': {
        token:'SOR',
        type: 'ERC721',
        ethereumName: 'blabla',
        ethereumSymbol: 'SOR',
        ethereumContractAddress: 'address',
        decimals: 1,
        tezosWrappingContract: 'string',
        tezosTokenId: 1,
        tezosSymbol: 'string',
        tezosName: 'string',
        thumbnailUri: 'https://info.tzwrap.com/icons/WRAP.png'
      },
      'SEA': {
        token:'SEA',
        type: 'ERC721',
        ethereumName: 'SEAN IS GREAT',
        ethereumSymbol: 'SEA',
        ethereumContractAddress: 'address',
        decimals: 1,
        tezosWrappingContract: 'string',
        tezosTokenId: 1,
        tezosSymbol: 'string',
        tezosName: 'string',
        thumbnailUri: 'https://info.tzwrap.com/icons/WRAP.png'
      },
    'SIN': {
      token:'SIN',
      type: 'ERC721',
      ethereumName: 'SINAZO IS GREAT',
      ethereumSymbol: 'SIN',
      ethereumContractAddress: 'address',
      decimals: 1,
      tezosWrappingContract: 'string',
      tezosTokenId: 1,
      tezosSymbol: 'string',
      tezosName: 'string',
      thumbnailUri: 'https://info.tzwrap.com/icons/WRAP.png'
    }
  }
  return (
    <Container>
      <TabsCard />
      <MultiConnect />
      <InputCard
        connected={true}
        onTokenChange={() => {}}
        token={tokens['SOR']}
        tokens={tokens}/>
      <NextCard />
    </Container>
  );
};
