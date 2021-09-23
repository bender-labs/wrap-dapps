import { Box, Container, Grid, IconButton, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TezosTokenIcon, useConfig, useTezosWalletContext } from '@wrap-dapps/components';
import { useHistory } from 'react-router';
import { paths } from '../routes';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
  const { stacking } = useConfig();

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

  const totalStaked = 0;

  function FarmSelector({ currentTezosLevel, onClick }: {
    currentTezosLevel: number;
    onClick: () => void;
  }) {
    return (
      <>
        <GridItem container justify={'space-between'} alignItems={'center'} onClick={onClick}>
          <GridImages item>
            <TezosTokenIcon url={stacking.reward.thumbnailUri ?? 'ipfs://'} width={60} height={60} />
          </GridImages>
          <LeftGridItem item>
            <OptionTypography>
              $WRAP Stacking farm
            </OptionTypography>
            <Rewards currentTezosLevel={currentTezosLevel} />
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

  function Rewards({ currentTezosLevel }: {
    currentTezosLevel: number;
  }) {
    if (currentTezosLevel > 0) {

      return (
        <>

        </>
      );
    }
    return <></>;
  }

  return (
    <Container maxWidth={'sm'}>
      <TitleBox>
        <TitleTypography>$WRAP Stacking</TitleTypography>
        <SubtitleTypography>Stake your $WRAP tokens to earn more $WRAP</SubtitleTypography>
      </TitleBox>
      <BoxTitle my={2}>
        <Total>
          Total $WRAP staked : {totalStaked}
        </Total>
      </BoxTitle>
      <ContainBox>
        <Grid container spacing={2} direction={'column'}>
          <Grid item key={stacking.stackingContract}>
            <MainPaperContent p={2}>
              <FarmSelector currentTezosLevel={currentTezosLevel} onClick={() => {
                history.push(paths.WRAP_STACKING_STAKE);
              }} />
            </MainPaperContent>
          </Grid>
        </Grid>
      </ContainBox>
    </Container>
  );
}
