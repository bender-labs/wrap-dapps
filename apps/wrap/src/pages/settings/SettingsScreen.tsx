import { Box, Container, Grid, IconButton, styled, Typography } from '@mui/material';
import React from 'react';
import { HeaderPage } from '../HeaderPage';

const StyledPaperContent = styled(Box)(() => ({
  borderRadius: '10px 10px 10px 10px',
  backgroundColor: 'white',
  marginBottom: '17px',
  transition: 'background-color 1s ease',
  '&:hover': {
    backgroundColor: '#FFD000'
  }
}));

const GridImages = styled(Grid)(() => ({
  '& img': {
    width: 60,
    height: 50,
    marginRight: 5,
    verticalAlign: 'middle'
  },
  '& :first-child': { left: '0', position: 'relative' }
}));

const BoxTitle = styled(Box)(() => ({
  justifyItems: 'center'
}));

const Total = styled(Typography)(() => ({
  color: 'white',
  textAlign: 'center',
  fontSize: '16px'
}));

const ContainBox = styled(Box)(() => ({
  borderRadius: '0 0 10px 10px',
  padding: '30px',
  backgroundColor: '#e5e5e5'
}));

const FirstSubtitle = styled(Typography)(() => ({
  color: '#000000',
  textAlign: 'center',
  marginBottom: '20px'
}));

const SecondSubtitle = styled(Typography)(() => ({
  color: '#000000',
  textAlign: 'center',
  marginBottom: '20px',
  paddingTop: '20px'
}));

export default function SettingsScreen() {

  return (
    <Container maxWidth={'sm'}>
      <HeaderPage title='Settings' subtitle='' />
      <ContainBox>
        <FirstSubtitle variant={'subtitle1'}>Choose your default Tezos RPC Node:</FirstSubtitle>

      </ContainBox>
    </Container>
  );
}
