import { FarmConfig, TezosTokenIcon, useTezosWalletContext } from '@wrap-dapps/components';
import { Box, Grid, IconButton, styled, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { Duration } from 'luxon';

export enum FarmStyle {
  CLASSIC,
  OLD
}

const MainPaperContent = styled(Box)(() => ({
  borderRadius: '10px 10px 10px 10px',
  backgroundColor: 'white',
  transition: 'background-color 1s ease',
  '&:hover': {
    backgroundColor: '#FFD000'
  }
}));

const OldPaperContent = styled(Box)(() => ({
  borderRadius: '10px 10px 10px 10px',
  backgroundColor: '#B1B1B1',
  transition: 'background-color 1s ease',
  '&:hover': {
    backgroundColor: '#FFD000'
  }
}));

const GridItem = styled(Grid)(() => ({
  '&:hover': {
    cursor: 'pointer'
  }
}));

const GridImages = styled(Grid)(() => ({
  '& :first-child': { left: '0', position: 'relative' }
}));

const LeftGridItem = styled(Grid)(() => ({
  flexGrow: 1,
  paddingLeft: '20px',
  textAlign: 'left'
}));

const OptionTypography = styled(Typography)(() => ({
  fontSize: '20px'
}));

const RewardsTypography = styled(Typography)(() => ({
  fontSize: '12px',

  '& > span': {
    fontWeight: 900
  }
}));

const ApyTypography = styled(Typography)(() => ({
  fontSize: '14px',

  '& > span': {
    fontWeight: 900
  }
}));

function Rewards({ currentTezosLevel, farmConfig }: {
  currentTezosLevel: number;
  farmConfig: FarmConfig;
}) {
  if (farmConfig.rewards && currentTezosLevel > 0) {
    const currentTotalRewards = new BigNumber(farmConfig.rewards.totalRewards)
      .shiftedBy(-farmConfig.rewardTokenDecimals)
      .dp(8)
      .toString(10);
    const currentStakedTotens = new BigNumber(farmConfig.farmTotalStaked ?? 0)
      .shiftedBy(-farmConfig.farmStakedToken.decimals)
      .dp(8)
      .toString(10);
    const endLevel =
      +farmConfig.rewards.startLevel + +farmConfig.rewards.duration;
    const periodEnded = endLevel < currentTezosLevel;
    const currentPeriodProgress = periodEnded
      ? 100
      : ((currentTezosLevel - +farmConfig.rewards.startLevel) /
        +farmConfig.rewards.duration) *
      100;
    const nextRewardsDuration = Duration.fromMillis(
      (endLevel - currentTezosLevel) * 30 * 1000
    );

    const nextRewardLabel = periodEnded
      ? 'Awaiting new rewards period'
      : `New rewards in ${
        endLevel - currentTezosLevel
      } blocks. (Approx. ${nextRewardsDuration.as('hour').toFixed(1)} hours)`;

    return (
      <>
        {farmConfig.apy && <ApyTypography>
          APY: <span>{farmConfig.apy}%</span>{'  '}APR: <span>{farmConfig.apr}%</span>
        </ApyTypography>
        }
        <RewardsTypography>
          {farmConfig.rewardTokenSymbol} rewards:{' '}
          <span>{currentTotalRewards}</span>
        </RewardsTypography>
        <RewardsTypography>
          Total ${farmConfig.farmStakedToken.symbol} staked:{' '}
          <span>{currentStakedTotens}</span>
        </RewardsTypography>
        <RewardsTypography>
          Period progress: <span>{currentPeriodProgress.toFixed(1)}%</span>
        </RewardsTypography>
        <RewardsTypography>{nextRewardLabel}</RewardsTypography>
      </>
    );
  }
  return <></>;
}

function FarmSelector({ currentTezosLevel, farmConfig, onClick }: {
  currentTezosLevel: number;
  farmConfig: FarmConfig;
  onClick: () => void;
}) {
  return (
    <>
      <GridItem container justify={'space-between'} alignItems={'center'} onClick={onClick}>
        <GridImages item>
          <TezosTokenIcon url={farmConfig.rewardTokenThumbnailUri ?? 'ipfs://'} width={60} height={60}/>
        </GridImages>
        <LeftGridItem item>
          <OptionTypography>
            {farmConfig.rewardTokenName} farm
          </OptionTypography>
          <Rewards currentTezosLevel={currentTezosLevel} farmConfig={farmConfig} />
        </LeftGridItem>
        <Grid item>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
      </GridItem>
    </>
  );
}

function MainFarmSelector({ currentTezosLevel, farmConfig, onClick }: {
  currentTezosLevel: number;
  farmConfig: FarmConfig;
  onClick: () => void;
}) {
  return (
    <MainPaperContent p={2}>
      <FarmSelector currentTezosLevel={currentTezosLevel} farmConfig={farmConfig} onClick={onClick} />
    </MainPaperContent>
  );
}

function OldFarmSelector({ currentTezosLevel, farmConfig, onClick }: {
  currentTezosLevel: number;
  farmConfig: FarmConfig;
  onClick: () => void;
}) {
  return (
    <OldPaperContent p={2}>
      <FarmSelector currentTezosLevel={currentTezosLevel} farmConfig={farmConfig} onClick={onClick} />
    </OldPaperContent>
  );
}

export type FarmListProps = {
  farms: FarmConfig[];
  onProgramSelect: (farm: string) => void;
  style: FarmStyle
};

export default function FarmList({ farms, onProgramSelect, style }: FarmListProps) {
  const [currentTezosLevel, setCurrentTezosLevel] = useState(0);
  const { tezosLibrary } = useTezosWalletContext();

  useEffect(() => {
    async function loadCurrentTezosLevel() {
      if (tezosLibrary()) {
        const blockHeader = await tezosLibrary()!.rpc.getBlockHeader();
        setCurrentTezosLevel(blockHeader.level);
      }
    }

    loadCurrentTezosLevel();
  }, [tezosLibrary]);

  return (
    <Grid container spacing={2} direction={'column'}>
      {farms.map((farmConfig) => (
        <Grid item key={farmConfig.farmContractAddress}>
          {style === FarmStyle.CLASSIC ?
            <MainFarmSelector
              currentTezosLevel={currentTezosLevel}
              farmConfig={farmConfig}
              onClick={() => onProgramSelect(farmConfig.farmContractAddress)}
            />
            :
            <OldFarmSelector
              currentTezosLevel={currentTezosLevel}
              farmConfig={farmConfig}
              onClick={() => onProgramSelect(farmConfig.farmContractAddress)}
            />
          }
        </Grid>
      ))}
    </Grid>
  );
}
