import { Box, Container, Typography } from '@material-ui/core';
import {
  NextCard,
  ReceiveCard, TabsCard
} from './cards';
import InputCard from './InputCard'
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
      <ReceiveCard />
      <NextCard />
    </Container>
  );
};
