import { Box, Container, Typography } from '@material-ui/core';
import { AmountToInputCard, DropDownCard, ReceiveCard } from './Cards';
import { EthereumConnectionButton, TezosConnectionButton } from '../wallet';
import MultiConnect from '../wallet/MultiConnect';

export type WrapContainerProps = {
  connected: boolean;
}

export const WrapContainer = ({connected}: WrapContainerProps) => {
  connected = false
  return (
    <Container
      maxWidth={'xs'}
      sx={{
        backgroundColor: 'yellow',
      }}
    >
      <MultiConnect/>
      <DropDownCard/>
      <AmountToInputCard/>
      <ReceiveCard/>



    </Container>
  )
}