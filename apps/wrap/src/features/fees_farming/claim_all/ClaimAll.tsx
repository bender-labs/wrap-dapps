import FarmingContractHeader from '../components/FarmingContractHeader';
import { paths } from '../../../pages/routes';
import { Box, styled, Table, TableBody } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { FarmConfig, LoadableButton, PaperFooter, TezosConnectionButton, useConfig } from '@wrap-dapps/components';
import React from 'react';
import IconSelect from '../../../pages/fees_farming/FarmToken';
import useClaimAll, { ClaimAllStatus } from './hook/useClaimAll';
import FarmingStyledTableCell from '../components/FarmingStyledCell';
import FarmingStyledCellHead from '../components/FarmingStyledCellHead';
import FarmingStyledTableRow from '../components/FarmingStyledTableRow';
import BigNumber from 'bignumber.js';
import { Route } from 'react-router-dom';

const BoxWrapper = styled(Box)(() => ({
  borderRadius: '0 0 10px 10px',
  padding: '30px',
  backgroundColor: '#e5e5e5'
}));

const StyledTable = styled(Table)(() => ({
  borderSpacing: '0 5px !important',
  borderCollapse: 'separate'
}));

const StyledPaperFooter = styled(PaperFooter)(() => ({
  padding: '20px 280px 0px 280px'
}));

export default function ClaimAll() {
  const { farms, oldFarms } = useConfig();

  const ClaimWithFarms = (farmsToUse: FarmConfig[]) => {
    const { claimAllStatus, claimAll, setClaimBalances, claimBalances } = useClaimAll(farmsToUse);

    const findCurrentPendingReward = (farm: FarmConfig): string => {
      const farmWithEarnings = claimBalances.find((claimBalance) => {
        return claimBalance.farmContractAddress === farm.farmContractAddress;
      });
      return farmWithEarnings ? farmWithEarnings.earned.shiftedBy(-farmWithEarnings.rewardTokenDecimals).toString(10) : 'loading ...';
    };

    const renderRow = (farm: FarmConfig, index: number) => {
      return (
        <FarmingStyledTableRow key={farm.farmContractAddress}>
          <FarmingStyledTableCell align='center'>
            <IconSelect src={farm.rewardTokenThumbnailUri} />
          </FarmingStyledTableCell>
          <FarmingStyledTableCell align='center'>
            {farm.rewardTokenSymbol}
          </FarmingStyledTableCell>
          <FarmingStyledTableCell align='center'>{findCurrentPendingReward(farm)}</FarmingStyledTableCell>
        </FarmingStyledTableRow>
      );
    };

    const reset = () => {
      setClaimBalances(claimBalances.map((claimBalance) => {
        claimBalance.earned = new BigNumber(0);
        return claimBalance;
      }));
    };

    return (
      <>
        <FarmingContractHeader title='All farms' path={paths.FARMING_ROOT} />
        <BoxWrapper>
          <TableContainer>
            <StyledTable>
              <TableHead>
                <TableRow>
                  <FarmingStyledCellHead align='center'>Symbol</FarmingStyledCellHead>
                  <FarmingStyledCellHead align='center'>Token Name</FarmingStyledCellHead>
                  <FarmingStyledCellHead align='center'>Your pending reward</FarmingStyledCellHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {farmsToUse.length > 0 ?
                  farmsToUse.map((farmConfig, index) => renderRow(farmConfig, index)) :
                  <TableRow><TableCell>No data to display...</TableCell></TableRow>
                }
              </TableBody>
            </StyledTable>
          </TableContainer>
          <StyledPaperFooter>
            {claimAllStatus !== ClaimAllStatus.NOT_CONNECTED && (
              <LoadableButton
                loading={claimAllStatus === ClaimAllStatus.CLAIMING}
                onClick={async () => {
                  await claimAll(reset);
                }}
                disabled={claimAllStatus !== ClaimAllStatus.READY}
                text={'Claim from all farms'}
                variant={'contained'}
              />
            )}
            {claimAllStatus === ClaimAllStatus.NOT_CONNECTED && (
              <TezosConnectionButton />
            )}
          </StyledPaperFooter>
        </BoxWrapper>
      </>
    );
  };

  return (
    <>
      <Route path={paths.ALL_FARMS_CLAIM} exact component={() => ClaimWithFarms(farms)} />
      <Route path={paths.OLD_ALL_FARMS_CLAIM} exact component={() => ClaimWithFarms(oldFarms)} />
    </>
  );
}
