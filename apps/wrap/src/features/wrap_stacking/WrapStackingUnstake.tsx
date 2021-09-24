import React, { useCallback, useEffect, useState } from 'react';
import { AssetSummary, LoadableButton, PaperContent, PaperFooter, TezosConnectionButton } from '@wrap-dapps/components';
import { WrapStackingContractActionProps } from './types';
import { WrapStackingContractInfo } from './components/WrapStackingContractInfo';
import { WrapStackingContractHeader } from './components/WrapStackingContractHeader';
import { WrapStackingDenseAmount } from './components/WrapStackingDenseAmount';
import useWrapStackingUnstake, { WrapStackingUnstakeStatus } from './hooks/useWrapStackingUnstake';
import { Checkbox, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { paths } from '../../pages/routes';
import { WrapStackingStakeInfo } from './api/WrapStackingApi';
import BigNumber from 'bignumber.js';

export interface WrapUnstakeInfo {
  id: BigNumber;
  amount: BigNumber;
  level: BigNumber;
  fees: number;
  maxAmount: BigNumber;
  mustUnstake: boolean;
}

const StyledTableCell = styled(TableCell)(() => ({
  borderBottomColor: 'rgb(196,196,196)'
}));

export function WrapStackingUnstake({
                                      stacking,
                                      onApply,
                                      wrapStackingOwnerInfos,
                                      balance
                                    }: WrapStackingContractActionProps) {
  const [wrapUnstakesInfos, setWrapUnstakesInfos] = useState<WrapUnstakeInfo[]>([]);

  const { unstakeStatus, amount, fees, unstake } = useWrapStackingUnstake(
    stacking,
    wrapStackingOwnerInfos.staked,
    wrapUnstakesInfos
  );

  useEffect(() => {
    if (wrapStackingOwnerInfos && wrapStackingOwnerInfos.stakes.length > 0) {
      orderByLevel(wrapStackingOwnerInfos.stakes);
      setWrapUnstakesInfos(wrapStackingOwnerInfos.stakes.map((wrapStackingOwnerInfo) => ({
        id: wrapStackingOwnerInfo.id,
        amount: wrapStackingOwnerInfo.amount,
        maxAmount: wrapStackingOwnerInfo.amount,
        level: wrapStackingOwnerInfo.level,
        fees: 100 / wrapStackingOwnerInfo.fees_ratio.toNumber(),
        mustUnstake: false
      })));
    }
  }, [wrapStackingOwnerInfos]);

  const orderByLevel = (stakes: WrapStackingStakeInfo[]): WrapStackingStakeInfo[] => {
    if (stakes.length > 0) {
      stakes.sort((a, b) => a.level.isGreaterThan(b.level) ? 1 : -1);
    }
    return stakes;
  };

  const handleUnstake = useCallback(async () => {
    await unstake();
    onApply();
  }, [onApply, unstake]);

  const changeAmount = (wrapUnstakeInfo: WrapUnstakeInfo, newValue: string) => {
    const newUnstakes = wrapUnstakesInfos.map((currentWrapUnstakeInfos) => {
      if (currentWrapUnstakeInfos.id.isEqualTo(wrapUnstakeInfo.id)) {
        return { ...currentWrapUnstakeInfos, amount: new BigNumber(newValue) };
      }
      return currentWrapUnstakeInfos;
    });
    setWrapUnstakesInfos(newUnstakes);
  };

  const activateUnstake = (wrapUnstakeInfo: WrapUnstakeInfo) => {
    const newUnstakes = wrapUnstakesInfos.map((currentWrapUnstakeInfos) => {
      if (currentWrapUnstakeInfos.id.isEqualTo(wrapUnstakeInfo.id)) {
        return { ...currentWrapUnstakeInfos, mustUnstake: !isStakeSelected(wrapUnstakeInfo) };
      }
      return currentWrapUnstakeInfos;
    });
    setWrapUnstakesInfos(newUnstakes);
  };

  const isStakeSelected = (wrapUnstakeInfo: WrapUnstakeInfo) => {
    const currentWrapUnstakeInfos = wrapUnstakesInfos.find((existingWrapUnstakeInfos) => existingWrapUnstakeInfos.id.isEqualTo(wrapUnstakeInfo.id));
    return currentWrapUnstakeInfos ? currentWrapUnstakeInfos.mustUnstake : false;
  };

  const feesTable = (wrapUnstakesInfos: WrapUnstakeInfo[]) => {
    return (
      <TableContainer component={'div'}>
        <Table size='small' aria-label='fees table'>
          <TableHead>
            <TableRow>
              <StyledTableCell component='th' align='center'>Stake block</StyledTableCell>
              <StyledTableCell component='th' align='center'>Fees</StyledTableCell>
              <StyledTableCell component='th' align='center'>Amount</StyledTableCell>
              <StyledTableCell component='th' align='center'>Use</StyledTableCell>
            </TableRow>
          </TableHead>
          {wrapUnstakesInfos.length > 0 ? wrapUnstakesInfos.map((wrapUnstakeInfo) => (
              <TableBody>
                <TableRow
                  key={'stake-' + wrapUnstakeInfo.id.toNumber()}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell align='center'>
                    {wrapUnstakeInfo.level.toString(10)}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {wrapUnstakeInfo.fees}%
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <WrapStackingDenseAmount wrapUnstakeInfo={wrapUnstakeInfo}
                                             onChange={(newValue) => (changeAmount(wrapUnstakeInfo, newValue))}
                                             decimals={stacking.reward.decimals} />
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <Checkbox checked={wrapUnstakeInfo.mustUnstake}
                              onChange={() => activateUnstake(wrapUnstakeInfo)}
                              inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            ))
            :
            <TableBody>
              <TableRow
                key={'stake-loading'}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell colSpan={4} align='center'>Loading ...</StyledTableCell>
              </TableRow>
            </TableBody>
          }
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <WrapStackingContractHeader path={paths.WRAP_STACKING} />
      <PaperContent>
        {feesTable(wrapUnstakesInfos)}
      </PaperContent>
      <AssetSummary
        decimals={8}
        symbol={'$WRAP'}
        label={'Burned Fees'}
        value={fees}
      />
      <WrapStackingContractInfo
        wrapStackingOwnerInfos={wrapStackingOwnerInfos}
        stacking={stacking}
      />
      <AssetSummary
        decimals={8}
        symbol={'$WRAP'}
        label={'You will receive'}
        value={amount}
      />
      <PaperFooter>
        {unstakeStatus !== WrapStackingUnstakeStatus.NOT_CONNECTED && (
          <LoadableButton
            loading={unstakeStatus === WrapStackingUnstakeStatus.UNSTAKING}
            onClick={handleUnstake}
            disabled={unstakeStatus !== WrapStackingUnstakeStatus.READY}
            text={'Unstake'}
            variant={'contained'}
          />
        )}
        {unstakeStatus === WrapStackingUnstakeStatus.NOT_CONNECTED && (
          <TezosConnectionButton />
        )}
      </PaperFooter>
    </>
  );
}
