import React, { useCallback } from 'react';
import { useWrapStackingStake, WrapStakingStakeStatus } from './hooks/useWrapStackingStake';
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
import { paths } from '../../pages/routes';

export function WrapStackingStake({
                                    stacking,
                                    wrapStackingOwnerInfos,
                                    balance,
                                    onApply
                                  }: WrapStackingContractActionProps) {
  const { amount, changeAmount, stakingStatus, stake } = useWrapStackingStake(
    stacking,
    balance.value
  );

  const handleStake = useCallback(async () => {
    await stake();
    onApply();
  }, [onApply, stake]);

  return (
    <>
      <WrapStackingContractHeader path={paths.WRAP_STACKING} />
      <PaperContent>
        <AmountToWrapInput
          balance={balance.value}
          decimals={8}
          symbol={'$WRAP'}
          onChange={changeAmount}
          amountToWrap={amount}
          balanceLoading={balance.loading}
          disabled={
            stakingStatus === WrapStakingStakeStatus.NOT_CONNECTED ||
            balance.value.isZero() ||
            balance.value.isNaN()
          }
        />
      </PaperContent>
      <WrapStackingContractInfo
        stacking={stacking}
        wrapStackingOwnerInfos={wrapStackingOwnerInfos}
      />
      <AssetSummary
        decimals={8}
        symbol={'$WRAP'}
        label={'Your new share will be'}
        value={amount.plus(wrapStackingOwnerInfos.staked)}
      />
      <PaperFooter>
        {stakingStatus !== WrapStakingStakeStatus.NOT_CONNECTED && (
          <LoadableButton
            loading={stakingStatus === WrapStakingStakeStatus.STAKING}
            onClick={handleStake}
            disabled={stakingStatus !== WrapStakingStakeStatus.READY}
            text={'Stake'}
            variant={'contained'}
          />
        )}
        {stakingStatus === WrapStakingStakeStatus.NOT_CONNECTED && (
          <TezosConnectionButton />
        )}
      </PaperFooter>
    </>
  );
}
