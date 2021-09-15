import React from 'react';
import { useHistory } from 'react-router';
import { Box, Container, styled, Typography } from '@mui/material';
import { useConfig } from '@wrap-dapps/components';
import ProgramList from '../../features/liquidity_mining/ProgramList';
import { useLiquidityMiningApy } from '../../features/liquidity_mining/hook/useLiquidityMiningApy';
import { liquidityMiningOperationPage } from '../routes';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginBottom: '20px'
}));

const TitleTypography = styled(Typography)(() => ({
  color: 'white',
  borderBottom: '3px solid #ffd000',
  textAlign: 'center',
  fontSize: '30px',
  paddingBottom: '15px'
}));

const ContainBox = styled(Box)(() => ({
  borderRadius: '0 0 10px 10px',
  padding: '30px',
  backgroundColor: '#e5e5e5'
}));

const SubtitlteTypography = styled(Typography)(() => ({
  color: '#000000',
  textAlign: 'center',
  marginBottom: '20px'
}));

export default function LiquidityMiningPrograms() {
  const history = useHistory();
  const { programs } = useConfig();
  const { liquidityMiningApys } = useLiquidityMiningApy();
  return (
    <StyledContainer maxWidth={'sm'}>
      <Box justifyItems='center' my={2}>
        <TitleTypography>Liquidity Mining Programs</TitleTypography>
      </Box>
      <ContainBox>
        <SubtitlteTypography variant={'subtitle1'}>Select an option to stake, unstake or claim your
          rewards.</SubtitlteTypography>
        <ProgramList
          programs={programs}
          onProgramSelect={(t) => {
            history.push(liquidityMiningOperationPage(t));
          }}
          liquidityMiningApys={liquidityMiningApys}
        />
      </ContainBox>
    </StyledContainer>
  );
}
