import React from 'react';
import { ProgramConfig, TezosIcon, TezosTokenIcon } from '@wrap-dapps/components';
import { Box, Grid, IconButton, styled, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LiquidityMiningApy } from '@wrap-dapps/api';
import { Duration } from 'luxon';

export type ProgramListProps = {
  programs: ProgramConfig[];
  onProgramSelect: (farm: string) => void;
  liquidityMiningApys: Array<LiquidityMiningApy> | undefined;
  old: boolean;
};

const StyledGridContainer = styled(Grid)(() => ({
  '&:hover': {
    cursor: 'pointer'
  }
}));

const StyledGridItem = styled(Grid)(() => ({
  '& img': { width: 60, height: 60, marginRight: 5, verticalAlign: 'middle' },
  '& :first-child': { left: '0', position: 'relative' },
  '& :last-child': { marginLeft: '-20px' }
}));

const OptionTypography = styled(Typography)(() => ({
  fontSize: '20px'
}));

const ApyTypography = styled(Typography)(() => ({
  fontSize: '14px',
  '& > span': {
    fontWeight: 900
  }
}));

const StyledBox = styled(Box)(() => ({
  borderRadius: '10px 10px 10px 10px',
  backgroundColor: '#ffffff',
  transition: 'background-color 1s ease',
  '&:hover': {
    backgroundColor: '#FFD000'
  }
}));

const EndsinTypography = styled(Typography)(() => ({
  fontSize: '13px'
}));

function showDuration(running: boolean, seconds: number): string {
  if (!running) {
    return 'Not running';
  }
  const duration = Duration.fromMillis(seconds * 1000);
  return duration.toFormat("d 'days' hh 'hours'");
}

function Program({ program, apy, onClick, old }: {
  program: ProgramConfig;
  apy: LiquidityMiningApy | undefined;
  onClick: () => void;
  old: boolean;
}) {
  const {
    pool: {
      quote,
      base: { thumbnailUri, symbol }
    }
  } = program;
  return (
    <StyledBox p={2} sx={(!old && (!apy || apy.running)) ? {} : { backgroundColor: '#C1C1C1' }}>
      <StyledGridContainer container justifyContent={'space-between'} alignItems={'center'} onClick={onClick}>
        <StyledGridItem item>
          <TezosTokenIcon url={thumbnailUri} width={60} height={60} />
          <TezosIcon />
        </StyledGridItem>
        <Grid item>
          <OptionTypography>
            Quipuswap {symbol}/{quote.toUpperCase()}
          </OptionTypography>
          {!old && apy && <ApyTypography>
            APY: <span>{parseFloat(apy.apy).toFixed(0)}%</span>
            {' '}APR: <span>{parseFloat(apy.apr).toFixed(0)}%</span>
          </ApyTypography>}
          {!old && apy && <EndsinTypography>
            Ends in (est.): {showDuration(apy.running, apy.remainingSeconds)}
          </EndsinTypography>}
        </Grid>
        <Grid item>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
      </StyledGridContainer>
    </StyledBox>
  );
}

export default function ProgramList({
                                      programs,
                                      onProgramSelect,
                                      liquidityMiningApys,
                                      old,
                                    }: ProgramListProps) {
  return (
    <Grid container spacing={2} direction={'column'}>
      {programs.map((t) => (
        <Grid item key={t.farmingContract}>
          <Program
            old={old}
            program={t}
            onClick={() => onProgramSelect(t.farmingContract)}
            apy={liquidityMiningApys ? liquidityMiningApys.find(l => l.farmingContract === t.farmingContract) : undefined}
          />
        </Grid>
      ))}
    </Grid>
  );
}
