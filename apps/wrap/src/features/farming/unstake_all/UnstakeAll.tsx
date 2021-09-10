import FarmingContractHeader from '../../../components/farming/FarmingContractHeader';
import { Box, styled, Table, TableBody } from '@mui/material';
import { paths } from '../../../pages/routes';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { FarmConfig, LoadableButton, PaperFooter, TezosConnectionButton } from '@wrap-dapps/components';
import TableCell from '@mui/material/TableCell';
import IconSelect from '../../../pages/farming/FarmToken';
import BigNumber from 'bignumber.js';
import useUnstakeAll, { UnstakeAllStatus } from './hook/useUnstakeAll';
import FarmingStyledTableCell from '../../../components/farming/FarmingStyledCell';
import FarmingStyledCellHead from '../../../components/farming/FarmingStyledCellHead';
import FarmingStyledTableRow from '../../../components/farming/FarmingStyledTableRow';
import { changeBalances } from '../balance-actions';
import { FarmAllProps } from '../../../pages/farming/WithBalancesScreen';

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

export default function UnstakeAll({ balances, balanceDispatch, balance, loading, refresh, farms }: FarmAllProps) {
  const { unstakeAllStatus, unstakeAll } = useUnstakeAll(balances.balances);

  const findCurrentWalletBalance = (farm: FarmConfig): string => {
    const contractBalance = balances.balances.find((elt) => {
      return elt.contract === farm.farmContractAddress;
    });
    return contractBalance && contractBalance.balance ?
      new BigNumber(contractBalance.balance).shiftedBy(-farm.farmStakedToken.decimals).toString(10) : '0';
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
        <FarmingStyledTableCell align='center'>{findCurrentWalletBalance(farm)}</FarmingStyledTableCell>
      </FarmingStyledTableRow>
    );
  };

  const total = () => {
    return balances.balances.reduce((total, contract) => {
      return total.plus(contract.balance ?? '0');
    }, new BigNumber(0)).shiftedBy(-8).toString(10);
  };

  const resetStakingBalances = () => {
    balanceDispatch(changeBalances({
      balances: balances.balances.map((stake) => {
        return {
          ...stake,
          balance: '0',
          totalStaked: new BigNumber(stake.totalStaked ?? 0).minus(stake.balance ?? 0).toString(10)
        };
      })
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
                <FarmingStyledCellHead align='center'>Your current Stake</FarmingStyledCellHead>
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
          {unstakeAllStatus !== UnstakeAllStatus.NOT_CONNECTED && (
            <LoadableButton
              loading={unstakeAllStatus === UnstakeAllStatus.UNSTAKING || balances.isDirty}
              onClick={async () => {
                await unstakeAll(resetStakingBalances);
              }}
              disabled={unstakeAllStatus !== UnstakeAllStatus.READY}
              text={balances.isDirty ? 'Waiting for confirmation' : `Unstake ${total()} $WRAP tokens`}
              variant={'contained'}
            />
          )}
          {unstakeAllStatus === UnstakeAllStatus.NOT_CONNECTED && (
            <TezosConnectionButton />
          )}
        </StyledPaperFooter>
      </BoxWrapper>
    </>
  );
};