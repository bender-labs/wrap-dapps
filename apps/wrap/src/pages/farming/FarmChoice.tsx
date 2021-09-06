import { Box, Container, Grid, IconButton, styled, Typography } from '@material-ui/core';
import React from 'react';
import FarmList, { FarmStyle } from './FarmList';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { PaperContent, useConfig } from '@wrap-dapps/components';
import { useHistory } from 'react-router';
import { farmStakePageRoute, oldFarmUnstakePageRoute, paths } from '../routes';
import BigNumber from 'bignumber.js';

const StyledPaperContent = styled(PaperContent)(() => ({
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

const Title = styled(Typography)(() => ({
  color: 'white',
  borderBottom: '3px solid #ffd000',
  textAlign: 'center',
  fontSize: '30px',
  paddingBottom: '15px'
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

export default function FarmChoice() {
  const history = useHistory();
  const { farms, oldFarms } = useConfig();

  const totalStaked = farms
    .reduce((total, farm) => {
      const staked = new BigNumber(farm.farmTotalStaked ?? 0).shiftedBy(
        -farm.farmStakedToken.decimals
      );
      return total.plus(staked);
    }, new BigNumber(0))
    .dp(0)
    .toString(10);

  const StakeAllButton = () => {
    const changeUri = () => {
      history.push(paths.ALL_FARMS_STAKE);
    };

    return (
      <StyledPaperContent>
        <Grid container alignItems={'center'} onClick={changeUri} justifyContent={'space-between'} sx={{'&:hover': {
            cursor: 'pointer'
          }}}>
          <GridImages item>
            <img alt={'stake all'} src='/static/images/wrap3gif.gif' />
          </GridImages>
          <Grid item>
            <Typography sx={{ fontSize: '20px' }}>
              Stake on all farms
            </Typography>
            <Typography sx={{ fontSize: '12px' }}>
              Stake your $WRAP tokens on all available farms at once
            </Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </Grid>
        </Grid>
      </StyledPaperContent>
    );
  };

  return (
    <Container maxWidth={'sm'}>
      <BoxTitle my={2}>
        <Title>Fees farming</Title>
      </BoxTitle>
      <BoxTitle my={2}>
        <Total>
          Total $WRAP staked : {totalStaked}
        </Total>
      </BoxTitle>
      <ContainBox>
        <StakeAllButton />
        <FirstSubtitle variant={'subtitle1'}>Or select a farm to stake, unstake or claim your
          fees share.</FirstSubtitle>
        <FarmList
          farms={farms}
          onProgramSelect={(farmContract) => {
            history.push(farmStakePageRoute(farmContract));
          }}
          style={FarmStyle.CLASSIC}
        />
        <SecondSubtitle variant={'subtitle1'}>
          or select an old farm to unstake.
        </SecondSubtitle>
        <FarmList
          farms={oldFarms}
          onProgramSelect={(farmContract) => {
            history.push(oldFarmUnstakePageRoute(farmContract));
          }}
          style={FarmStyle.OLD}
        />
      </ContainBox>
    </Container>
  );
}
