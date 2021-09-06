import {
  AmountToWrapInput,
  AssetSummary,
  LoadableButton,
  PaperContent,
  PaperFooter,
  TezosConnectionButton
} from '@wrap-dapps/components';
import useStake, { StakingStatus } from './hook/useStake';
import React, { useCallback } from 'react';
import { FarmingContractActionsProps } from '../types';
import FarmingContractInfo from '../../../components/farming/FarmingContractInfo';
import FarmingContractHeader from '../../../components/farming/FarmingContractHeader';
import { paths } from '../../../pages/routes';

export default function Stake({ farm, farmBalances, onApply, inputBalance }: FarmingContractActionsProps) {
  const { amount, changeAmount, stakingStatus, stake } = useStake(
    farm,
    inputBalance.value
  );

  const handleStake = useCallback(async () => {
    await stake();
    onApply();
  }, [onApply, stake]);

  return (
    <>
      <FarmingContractHeader title={farm.rewardTokenName + ' farm'} path={paths.FARMING_ROOT} />
      <PaperContent>
        <AmountToWrapInput
          balance={inputBalance.value}
          decimals={farm.farmStakedToken.decimals}
          symbol={farm.farmStakedToken.symbol}
          onChange={changeAmount}
          amountToWrap={amount}
          balanceLoading={inputBalance.loading}
          disabled={
            stakingStatus === StakingStatus.NOT_CONNECTED ||
            inputBalance.value.isZero() ||
            inputBalance.value.isNaN()
          }
        />
      </PaperContent>
      <FarmingContractInfo
        farm={farm}
        farmBalances={farmBalances}
        inputBalance={inputBalance}
      />
      <AssetSummary
        decimals={farm.farmStakedToken.decimals}
        symbol={farm.farmStakedToken.symbol}
        label={'Your new share will be'}
        value={amount.plus(farmBalances.staked)}
      />
      <PaperFooter>
        {stakingStatus !== StakingStatus.NOT_CONNECTED && (

          <LoadableButton
            loading={stakingStatus === StakingStatus.STAKING}
            onClick={handleStake}
            disabled={stakingStatus !== StakingStatus.READY}
            text={'Stake'}
            variant={'contained'}
          />
        )}
        {stakingStatus === StakingStatus.NOT_CONNECTED && (
          <TezosConnectionButton />
        )}
      </PaperFooter>
    </>
  );
}
