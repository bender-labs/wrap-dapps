import { Box, styled, Typography } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { FarmConfig, LoadableButton, PaperFooter, TezosConnectionButton } from '@wrap-dapps/components';
import React, { useState } from 'react';
import IconSelect from '../../../pages/fees_farming/FarmToken';
import BigNumber from 'bignumber.js';
import { paths } from '../../../pages/routes';
import FarmingContractHeader from '../components/FarmingContractHeader';
import FarmingStyledTableCell from '../components/FarmingStyledCell';
import FarmingStyledCellHead from '../components/FarmingStyledCellHead';
import FarmingStyledTableRow from '../components/FarmingStyledTableRow';
import useStakeAll, { NewStake, StakeAllStatus } from './hook/useStakeAll';
import { changeBalances } from '../balance-actions';
import { ContractBalance } from '../balances-reducer';
import { FarmAllProps } from '../../../pages/fees_farming/WithBalancesScreen';

const StyledInput = styled('input')(() => ({
  border: 'none',
  padding: '7px',
  backgroundColor: '#e5e5e5',
  textAlign: 'center',

  '&:focus': {
    outline: 'none',
    borderBottomColor: '200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  }
}));

const BoxWrapper = styled(Box)(() => ({
  borderRadius: '0 0 10px 10px',
  padding: '30px',
  backgroundColor: '#e5e5e5'
}));

const BalanceTitle = styled('h4')(() => ({
  textAlign: 'center',
  marginTop: '0'
}));

const StyledTable = styled(Table)(() => ({
  borderSpacing: '0 5px !important',
  borderCollapse: 'separate'
}));

const StyledPaperFooter = styled(PaperFooter)(() => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-around'
}));

export default function StakeAll({ balances, balanceDispatch, balance, loading, refresh, farms }: FarmAllProps) {
  const [newStakes, setNewStakes] = useState<NewStake[]>([]);
  const { stakeAllStatus, stakeAll } = useStakeAll(newStakes);

  const inputChangeHandler = (event: any, contract: string, farmStakedTokenAddress: string, decimals: number) => {
    if (typeof event.target.value !== 'undefined' && event.target.value !== '') {
      let newAmount = event.target.value;

      const existingNewStake = newStakes.find((newStake) => {
        return newStake.contract === contract;
      });

      if (existingNewStake) {
        setNewStakes(newStakes.map((newStake) => {
          if (newStake.contract === contract) {
            newStake.amount = newAmount;
          }
          return newStake;
        }));
      } else {
        const newNewStakes = newStakes.slice();
        newNewStakes.push({
          contract: contract,
          farmStakedToken: farmStakedTokenAddress,
          amount: newAmount,
          stakeDecimals: decimals
        });
        setNewStakes(newNewStakes);
      }
    } else {
      setNewStakes(newStakes.filter(stake => stake.contract !== contract));
    }
  };

  const total = (): string => {
    return newStakes.reduce((total, elt) => {
      const amount = new BigNumber(elt.amount);
      return amount.isNaN() ? total : total.plus(elt.amount);
    }, new BigNumber(0)).toString(10);
  };

  const findCurrentWalletBalance = (farm: FarmConfig): string => {
    const contractBalance = balances.balances.find((elt) => elt.contract === farm.farmContractAddress);
    return new BigNumber(contractBalance?.balance ?? 0).shiftedBy(-farm.farmStakedToken.decimals).toString(10);
  };

  const findFarmTotalStaked = (farm: FarmConfig, balances: ContractBalance[]): string => {
    const currentBalance = balances.find((balance) => balance.contract === farm.farmContractAddress);
    return new BigNumber(currentBalance?.totalStaked ?? 0).shiftedBy(-farm.farmStakedToken.decimals).toString(10);
  };

  const updateBalances = (newStakes: NewStake[]): void => {
    balanceDispatch(changeBalances({
      balances: balances.balances.map((contractBalance) => {
        const newStakeToApply = newStakes.find((newStake) => {
          return newStake.contract === contractBalance.contract;
        });

        if (newStakeToApply) {
          const amount = new BigNumber(newStakeToApply.amount);
          if (!amount.isNaN()) {
            const newStakeAmount = amount.shiftedBy(newStakeToApply.stakeDecimals);
            contractBalance.balance = new BigNumber(contractBalance.balance ?? 0).plus(newStakeAmount).toString(10);
            contractBalance.totalStaked = new BigNumber(contractBalance.totalStaked ?? 0).plus(newStakeAmount).toString(10);
          }
        }
        return contractBalance;
      })
    }));
  };

  const ditributeEvenly = (): void => {
    if (farms && farms.length > 0 && balance.gt(0)) {
      const amount = balance.dividedBy(farms.length).shiftedBy(-farms[0].farmStakedToken.decimals).dp(farms[0].farmStakedToken.decimals, BigNumber.ROUND_DOWN);
      const newNewStakes = farms.map((farm): NewStake => {
        return {
          amount: amount.toString(10),
          contract: farm.farmContractAddress,
          stakeDecimals: farm.farmStakedToken.decimals,
          farmStakedToken: farm.farmStakedToken.contractAddress
        };
      });
      setNewStakes(newNewStakes);
    }
  };

  const findValueForInput = (farmContractAddress: string): string => {
    const stake = newStakes.find((stake) => stake.contract === farmContractAddress);
    return stake ? stake.amount : '';
  };

  const renderRow = (farm: FarmConfig) => {
    return (
      <FarmingStyledTableRow key={farm.farmContractAddress}>
        <FarmingStyledTableCell align='center'>
          <IconSelect src={farm.rewardTokenThumbnailUri} />
        </FarmingStyledTableCell>
        <FarmingStyledTableCell align='center'>
          {farm.rewardTokenSymbol}
        </FarmingStyledTableCell>
        <FarmingStyledTableCell align='center'>
          {farm.apy ?? 0}%
        </FarmingStyledTableCell>
        <FarmingStyledTableCell align='center'>
          {farm.apr ?? 0}%
        </FarmingStyledTableCell>
        <FarmingStyledTableCell align='center'>
          {findFarmTotalStaked(farm, balances.balances)}
        </FarmingStyledTableCell>
        <FarmingStyledTableCell align='center'>{findCurrentWalletBalance(farm)}</FarmingStyledTableCell>
        <FarmingStyledTableCell align='center'>
          <StyledInput
            onChange={(e) => inputChangeHandler(e, farm.farmContractAddress, farm.farmStakedToken.contractAddress, farm.farmStakedToken.decimals)}
            value={findValueForInput(farm.farmContractAddress)}
            placeholder='Enter Amount...' />
        </FarmingStyledTableCell>
      </FarmingStyledTableRow>
    );
  };

  const isTotalInvalid = (): boolean => {
    if (balance && farms && farms.length > 0) {
      return balance.shiftedBy(-farms[0].farmStakedToken.decimals).isLessThan(total());
    }
    return true;
  };

  const availableTokens = (): string => {
    if (!loading && !balances.isDirty && farms.length > 0 && !balance.isNaN()) {
      return balance.shiftedBy(-farms[0].farmStakedToken.decimals).toString(10);
    }

    return 'Loading ...';
  };

  return (
    <>
      <FarmingContractHeader title='All farms' path={paths.FARMING_ROOT} />
      <BoxWrapper>
        <BalanceTitle>Available $WRAP tokens: {availableTokens()}</BalanceTitle>
        <TableContainer>
          <StyledTable>
            <TableHead>
              <TableRow>
                <FarmingStyledCellHead align='center'>Symbol</FarmingStyledCellHead>
                <FarmingStyledCellHead align='center'>Token Name</FarmingStyledCellHead>
                <FarmingStyledCellHead align='center'>APY</FarmingStyledCellHead>
                <FarmingStyledCellHead align='center'>APR</FarmingStyledCellHead>
                <FarmingStyledCellHead align='center'>Global Stake</FarmingStyledCellHead>
                <FarmingStyledCellHead align='center'>Your current Stake</FarmingStyledCellHead>
                <FarmingStyledCellHead align='center'>New Stake</FarmingStyledCellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {farms.length > 0 ?
                farms.map((farmConfig) => renderRow(farmConfig)) :
                <TableRow><TableCell>No data to display...</TableCell></TableRow>
              }
              <FarmingStyledTableRow>
                <FarmingStyledTableCell colSpan={4} />
                <FarmingStyledTableCell>
                  <Typography>
                    Total :
                  </Typography>
                </FarmingStyledTableCell>
                <FarmingStyledTableCell>
                  <Typography>
                    {total()}
                  </Typography>
                </FarmingStyledTableCell>
              </FarmingStyledTableRow>
            </TableBody>
          </StyledTable>
        </TableContainer>
        <StyledPaperFooter>
          <LoadableButton loading={loading} onClick={ditributeEvenly} disabled={balances.isDirty}
                          text={'Distribute my tokens evenly'} />
          {stakeAllStatus !== StakeAllStatus.NOT_CONNECTED && (
            <LoadableButton
              loading={stakeAllStatus === StakeAllStatus.UNSTAKING || balances.isDirty}
              onClick={async () => {
                await stakeAll(newStakes, updateBalances);
              }}
              disabled={stakeAllStatus !== StakeAllStatus.READY || isTotalInvalid()}
              text={balances.isDirty ? 'Waiting for confirmation' : 'Stake on all selected farms'}
              variant={'contained'}
            />
          )}
          {stakeAllStatus === StakeAllStatus.NOT_CONNECTED && (
            <TezosConnectionButton />
          )}
        </StyledPaperFooter>
      </BoxWrapper>
    </>
  );
}