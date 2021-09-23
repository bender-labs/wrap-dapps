import React, { useCallback } from 'react';
import {
  AmountToWrapInput,
  AssetSummary,
  LoadableButton,
  PaperContent,
  PaperFooter,
  TezosConnectionButton
} from '@wrap-dapps/components';
import { WrapStackingContractActionProps } from './types';
import { WrapStackingContractInfo } from './components/WrapStackingContractInfo';
import { WrapStackingContractHeader } from './components/WrapStackingContractHeader';
import useWrapStackingUnstake, { WrapStackingUnstakeStatus } from './hooks/useWrapStackingUnstake';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { paths } from '../../pages/routes';

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

  const orderByLevel = () => {

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
              {wrapStackingOwnerInfos?.stakes?.map((stake) => (
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
                    {stake.amount.toString(10)}
                  </TableCell>
                  <TableCell align='right'>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AmountToWrapInput
          balance={wrapStackingOwnerInfos.staked}
          decimals={8}
          symbol={'$WRAP'}
          onChange={changeAmount}
          amountToWrap={amount}
          balanceLoading={wrapStackingOwnerInfos.loading}
          disabled={
            unstakeStatus === WrapStackingUnstakeStatus.NOT_CONNECTED ||
            wrapStackingOwnerInfos.staked.isZero() ||
            wrapStackingOwnerInfos.staked.isNaN()
          }
        />
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
