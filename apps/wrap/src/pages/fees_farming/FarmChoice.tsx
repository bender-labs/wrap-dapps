import { Alert, AlertTitle, Box, Container, Grid, IconButton, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import FarmList, { FarmStyle } from './FarmList';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoIcon from '@mui/icons-material/Info';
import { useConfig } from '@wrap-dapps/components';
import { useHistory } from 'react-router';
import { farmStakePageRoute, paths } from '../routes';
import BigNumber from 'bignumber.js';
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

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.background.default
}));

export default function FarmChoice() {
  const history = useHistory();
  const { farms, oldFarms } = useConfig();

  const totalStaked = farms.concat(oldFarms)
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
      <StyledPaperContent p={2}>
        <Grid container alignItems={'center'} onClick={changeUri} justifyContent={'space-between'} sx={{
          '&:hover': {
            cursor: 'pointer'
          }
        }}>
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

  const OldFarmsButton = () => {
    const changeUri = () => {
      history.push(paths.OLD_ALL_FARMS_UNSTAKE);
    };

    return (
      <StyledPaperContent p={2} sx={{ backgroundColor: '#B1B1B1' }}>
        <Grid container alignItems={'center'} onClick={changeUri} justifyContent={'space-between'} sx={{
          '&:hover': {
            cursor: 'pointer'
          }
        }}>
          <GridImages item>
            <InfoIcon sx={{ width: 60, height: 60 }} />
          </GridImages>
          <Grid item>
            <Typography sx={{ fontSize: '20px' }}>
              Manage deactivated farms
            </Typography>
            <Typography sx={{ fontSize: '12px' }}>
              Unstake your $WRAP tokens and claim your fees from old farms
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
      <HeaderPage title='Fees farming' subtitle='Stake your $WRAP tokens to earn wTokens collected through fees' />
      <BoxTitle my={2}>
        <Total>
          Total $WRAP staked : {totalStaked}
        </Total>
      </BoxTitle>
      <BoxTitle my={6}>
        <Alert severity='warning'>
          <AlertTitle>New farms warning</AlertTitle>
          <p>New farms have been deployed on 2021-09-15</p>
          <p>You will still be able to unstake and claim from old farms through our <StyledLink
            to={paths.OLD_ALL_FARMS_UNSTAKE}>dedicated interface</StyledLink></p>
        </Alert>
      </BoxTitle>
      <ContainBox>
        <StakeAllButton />
        <FirstSubtitle variant={'subtitle1'}>Or select a farm to stake, unstake or claim your fees share
          :</FirstSubtitle>
        <FarmList
          farms={farms}
          onProgramSelect={(farmContract) => {
            history.push(farmStakePageRoute(farmContract));
          }}
          style={FarmStyle.CLASSIC}
        />
        <SecondSubtitle variant={'subtitle1'}>
          Or unstake and claim from old deactivated farms :
        </SecondSubtitle>
        <OldFarmsButton />
      </ContainBox>
    </Container>
  );
}
