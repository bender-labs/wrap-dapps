import FarmingContractHeader from '../../../components/farming/FarmingContractHeader';
import { paths } from '../../../pages/routes';
import { Box, styled, Table, TableBody } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { FarmConfig, LoadableButton, PaperFooter, TezosConnectionButton, useConfig } from '@wrap-dapps/components';
import React from 'react';
import IconSelect from '../../../pages/farming/FarmToken';
import useClaimAll, { ClaimAllStatus } from './hook/useClaimAll';
import FarmingStyledTableCell from '../../../components/farming/FarmingStyledCell';
import FarmingStyledTableRow from '../../../components/farming/FarmingStyledTableRow';
import BigNumber from 'bignumber.js';

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
  const { farms } = useConfig();
  const { claimAllStatus, claimAll, setClaimBalances, claimBalances } = useClaimAll(farms);

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
                <FarmingStyledTableCell align='center'>Symbol</FarmingStyledTableCell>
                <FarmingStyledTableCell align='center'>Token Name</FarmingStyledTableCell>
                <FarmingStyledTableCell align='center'>Your pending reward</FarmingStyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {farms.length > 0 ?
                farms.map((farmConfig, index) => renderRow(farmConfig, index)) :
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
}
