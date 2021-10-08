import React from 'react';
import { useHistory } from 'react-router';
import { Box, Container, styled, Typography } from '@mui/material';
import { useConfig } from '@wrap-dapps/components';
import ProgramList from '../../features/liquidity_mining/ProgramList';
import { useLiquidityMiningApy } from '../../features/liquidity_mining/hook/useLiquidityMiningApy';
import { liquidityMiningOperationPage, oldLiquidityMiningOperationPage } from '../routes';
import { HeaderPage } from '../HeaderPage';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginBottom: '20px'
}));

const ContainBox = styled(Box)(() => ({
  borderRadius: '0 0 10px 10px',
  padding: '30px',
  backgroundColor: '#e5e5e5'
}));

const SubtitleTypography = styled(Typography)(() => ({
  color: '#000000',
  textAlign: 'center',
  marginBottom: '20px'
}));

const SubSubtitleTypography = styled(Typography)(() => ({
  color: '#000000',
  textAlign: 'center',
  marginTop: '20px',
  marginBottom: '20px'
}));

export default function LiquidityMiningPrograms() {
  const history = useHistory();
  const { liquidityMiningPrograms, oldLiquidityMiningPrograms } = useConfig();
  const { liquidityMiningApys } = useLiquidityMiningApy();
  return (
    <StyledContainer maxWidth={'sm'}>
      <HeaderPage title='Liquidity Mining' subtitle='Stake your favorite AMM LP tokens to earn $WRAP tokens' />
      <ContainBox>
        <SubtitleTypography variant={'subtitle1'}>Select an option to stake, unstake or claim your
          rewards.</SubtitleTypography>
        <ProgramList
          programs={liquidityMiningPrograms}
          onProgramSelect={(t) => {
            history.push(liquidityMiningOperationPage(t));
          }}
          liquidityMiningApys={liquidityMiningApys}
        />
        <SubSubtitleTypography variant={'subtitle1'}>Or unstake and claim from old deactivated farms :</SubSubtitleTypography>
        <ProgramList
          old={true}
          programs={oldLiquidityMiningPrograms}
          onProgramSelect={(t) => {
            history.push(oldLiquidityMiningOperationPage(t));
          }}
          liquidityMiningApys={liquidityMiningApys}
        />
      </ContainBox>
    </StyledContainer>
  );
}
