import { Box, Container, Typography } from '@material-ui/core';
// import { Card } from './Card'
import { EthereumConnectionButton, TezosConnectionButton } from '../wallet';
import MultiConnect from '../wallet/MultiConnect';

export type MainContainerProps = {
  connected: boolean;
}

export const MainContainer = ({connected}: MainContainerProps) => {
  connected = false
  return (
    <Container
      maxWidth={'xs'}
      sx={{
        backgroundColor: 'yellow',
      }}
    >
      <Box sx={{
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 300,
        height: 300
      }}>
        <MultiConnect/>


      </Box>

    </Container>
  )
}