import React, { useCallback } from 'react';
import { AssetSummary, LoadableButton, PaperContent, PaperFooter, TezosConnectionButton } from '@wrap-dapps/components';
import { WrapStackingContractActionProps } from './types';
import { WrapStackingContractInfo } from './components/WrapStackingContractInfo';
import { WrapStackingContractHeader } from './components/WrapStackingContractHeader';
import { WrapStackingDenseAmount } from './components/WrapStackingDenseAmount';
import useWrapStackingUnstake, { WrapStackingUnstakeStatus } from './hooks/useWrapStackingUnstake';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { paths } from '../../pages/routes';
import { WrapStackingStakeInfo } from './api/WrapStackingApi';

export function WrapStackingUnstake({
                                      stacking,
                                      onApply,
                                      wrapStackingOwnerInfos,
                                      balance
                                    }: WrapStackingContractActionProps) {
  const { unstakeStatus, amount, changeAmount, unstake } = useWrapStackingUnstake(
    stacking,
    wrapStackingOwnerInfos.staked
  );

  const handleUnstake = useCallback(async () => {
    await unstake();
    onApply();
  }, [onApply, unstake]);

  const orderByLevel = (stakes: WrapStackingStakeInfo[]): WrapStackingStakeInfo[] => {
    if (stakes.length > 0) {
      stakes.sort((a, b) => a.level.isGreaterThan(b.level) ? 1 : -1);
    }
    return stakes;
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
                <TableCell align='right'>Fees</TableCell>
                <TableCell align='right'>Amount</TableCell>
                <TableCell align='right'>Use</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wrapStackingOwnerInfos?.stakes && orderByLevel(wrapStackingOwnerInfos?.stakes).map((stake) => (
                <TableRow
                  key={'stake-' + stake.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {stake.level.toString(10)}
                  </TableCell>
                  <TableCell align='right'>
                    {100 / stake.fees_ratio.toNumber()}%
                  </TableCell>
                  <TableCell align='right'>
                    <WrapStackingDenseAmount amount={stake.amount} onChange={() => {
                    }} decimals={stacking.reward.decimals} />
                  </TableCell>
                  <TableCell align='right'>

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
