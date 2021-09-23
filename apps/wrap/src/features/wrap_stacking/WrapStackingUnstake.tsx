import React, { useCallback, useEffect, useState } from 'react';
import { AssetSummary, LoadableButton, PaperContent, PaperFooter, TezosConnectionButton } from '@wrap-dapps/components';
import { WrapStackingContractActionProps } from './types';
import { WrapStackingContractInfo } from './components/WrapStackingContractInfo';
import { WrapStackingContractHeader } from './components/WrapStackingContractHeader';
import { WrapStackingDenseAmount } from './components/WrapStackingDenseAmount';
import useWrapStackingUnstake, { WrapStackingUnstakeStatus } from './hooks/useWrapStackingUnstake';
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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

export function WrapStackingUnstake({
                                      stacking,
                                      onApply,
                                      wrapStackingOwnerInfos,
                                      balance
                                    }: WrapStackingContractActionProps) {
  const [wrapUnstakesInfos, setWrapUnstakesInfos] = useState<WrapUnstakeInfo[]>([]);

  const { unstakeStatus, amount, unstake } = useWrapStackingUnstake(
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

  return (
    <>
      <WrapStackingContractHeader path={paths.WRAP_STACKING} />
      <PaperContent>
        <TableContainer component={Paper}>
          <Table size='small' aria-label='fees table'>
            <TableHead>
              <TableRow>
                <TableCell>Stake block</TableCell>
                <TableCell align='center'>Fees</TableCell>
                <TableCell align='center'>Amount</TableCell>
                <TableCell align='center'>Use</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wrapUnstakesInfos.map((wrapUnstakeInfo) => (
                <TableRow
                  key={'stake-' + wrapUnstakeInfo.id.toNumber()}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {wrapUnstakeInfo.level.toString(10)}
                  </TableCell>
                  <TableCell align='center'>
                    {wrapUnstakeInfo.fees}%
                  </TableCell>
                  <TableCell align='center'>
                    <WrapStackingDenseAmount wrapUnstakeInfo={wrapUnstakeInfo} onChange={(newValue) => (changeAmount(wrapUnstakeInfo, newValue))} decimals={stacking.reward.decimals} />
                  </TableCell>
                  <TableCell align='center'>
                    <Checkbox checked={wrapUnstakeInfo.mustUnstake}
                              onChange={() => activateUnstake(wrapUnstakeInfo)}
                              inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PaperContent>
      <WrapStackingContractInfo
        wrapStackingOwnerInfos={wrapStackingOwnerInfos}
        stacking={stacking}
      />
      <AssetSummary
        decimals={8}
        symbol={'$WRAP'}
        label={'Your new share will be'}
        value={wrapStackingOwnerInfos.staked.minus(amount)}
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
