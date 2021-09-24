import { Box, Container, Grid, IconButton, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { StackingConfig, TezosTokenIcon, useConfig, useTezosWalletContext } from '@wrap-dapps/components';
import { useHistory } from 'react-router';
import { paths } from '../routes';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BigNumber from 'bignumber.js';

const BoxTitle = styled(Box)(() => ({
  justifyItems: 'center'
}));

const TitleBox = styled(Box)(({ theme }) => ({
  justifyItems: 'center',
  borderBottom: '3px solid #ffd000',
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(2)
}));

const TitleTypography = styled(Typography)(() => ({
  color: 'white',
  textAlign: 'center',
  fontSize: '30px'
}));

const SubtitleTypography = styled(Typography)(({ theme }) => ({
  color: 'white',
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: 500,
  padding: theme.spacing(1)
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


const MainPaperContent = styled(Box)(() => ({
  borderRadius: '10px 10px 10px 10px',
  backgroundColor: 'white',
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

export default function WrapStackingList() {
  const history = useHistory();
  const { stacking, farmInput } = useConfig();
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

  function WrapStackingSelector({ currentTezosLevel, onClick, wrapStackingConfiguration }: {
    currentTezosLevel: number;
    onClick: () => void;
    wrapStackingConfiguration: StackingConfig
  }) {
    return (
      <>
        <GridItem container justify={'space-between'} alignItems={'center'} onClick={onClick}>
          <GridImages item>
            <TezosTokenIcon url={wrapStackingConfiguration.reward.thumbnailUri ?? 'ipfs://'} width={60} height={60} />
          </GridImages>
          <LeftGridItem item>
            <OptionTypography>
              $WRAP Stacking farm
            </OptionTypography>
            <Rewards currentTezosLevel={currentTezosLevel} wrapStackingConfiguration={wrapStackingConfiguration} />
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

  function Rewards({ currentTezosLevel, wrapStackingConfiguration }: {
    currentTezosLevel: number;
    wrapStackingConfiguration: StackingConfig
  }) {
    if (currentTezosLevel > 0) {
      return (
        <>
          {wrapStackingConfiguration.apy && <ApyTypography>
            APY: <span>{wrapStackingConfiguration.apy}%</span>{'  '}APR: <span>{wrapStackingConfiguration.apr}%</span>
          </ApyTypography>
          }
          <RewardsTypography>
            Total ${wrapStackingConfiguration.reward.symbol} staked:{' '}
            <span>{new BigNumber(wrapStackingConfiguration.totalStaked).shiftedBy(-wrapStackingConfiguration.reward.decimals).toString(10)}</span>
          </RewardsTypography>
        </>
      );
    }
    return <></>;
  }

  const allContractsStacked = (): string => {
    if (stacking.length > 0) {
      return stacking.reduce((acc, t) => {
        return acc.plus(new BigNumber(t.totalStaked));
      }, new BigNumber(0)).shiftedBy(-farmInput.decimals).toString(10);
    }
    return '0';
  };

  return (
    <Container maxWidth={'sm'}>
      <TitleBox>
        <TitleTypography>$WRAP Stacking</TitleTypography>
        <SubtitleTypography>Stake your $WRAP to earn more $WRAP</SubtitleTypography>
      </TitleBox>
      <BoxTitle my={2}>
        <Total>
          Total $WRAP staked : {allContractsStacked()}
        </Total>
      </BoxTitle>
      <ContainBox>
        <Grid container spacing={2} direction={'column'}>
          {stacking && stacking.length > 0 && stacking.map((stackingContractConfiguration) => {
            return (<Grid item key={stackingContractConfiguration.stackingContract}>
              <MainPaperContent p={2}>
                <WrapStackingSelector currentTezosLevel={currentTezosLevel} onClick={() => {
                  history.push(paths.WRAP_STACKING_STAKE);
                }} wrapStackingConfiguration={stackingContractConfiguration} />
              </MainPaperContent>
            </Grid>);
          })}
        </Grid>
      </ContainBox>
    </Container>
  );
}
