import {
  AmountToWrapInput,
  AssetSummary,
  LoadableButton,
  PaperContent,
  PaperFooter,
  TezosConnectionButton
} from '@wrap-dapps/components';
import useUnstake, { UnstakeStatus } from './hook/useUnstake';
import React, { useCallback } from 'react';
import { FarmingContractActionsProps } from '../types';
import FarmingContractInfo from '../components/FarmingContractInfo';
import FarmingContractHeader from '../components/FarmingContractHeader';
import { paths } from '../../../pages/routes';

export function Unstake({ farm, onApply, farmBalances, inputBalance }: FarmingContractActionsProps) {
  const { unstakeStatus, amount, changeAmount, unstake } = useUnstake(
    farm,
    farmBalances.staked
  );

  const handleWithdrawal = useCallback(async () => {
    await unstake();
    onApply();
  }, [onApply, unstake]);

  return (
    <>
      <FarmingContractHeader title={farm.rewardTokenName + ' farm'} path={paths.FARMING_ROOT} />
      <PaperContent>
        <AmountToWrapInput
          balance={farmBalances.staked}
          decimals={farm.farmStakedToken.decimals}
          symbol={'Staked ' + farm.farmStakedToken.symbol}
          onChange={changeAmount}
          amountToWrap={amount}
          balanceLoading={inputBalance.loading}
          disabled={
            unstakeStatus === UnstakeStatus.NOT_CONNECTED ||
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
        value={farmBalances.staked.minus(amount)}
      />
      <PaperFooter>

        {unstakeStatus !== UnstakeStatus.NOT_CONNECTED && (
          <LoadableButton
            loading={unstakeStatus === UnstakeStatus.UNSTAKING}
            onClick={handleWithdrawal}
            disabled={unstakeStatus !== UnstakeStatus.READY}
            text={'Unstake'}
            variant={'contained'}
          />
        )}
        {unstakeStatus === UnstakeStatus.NOT_CONNECTED && (
          <TezosConnectionButton />
        )}
      </PaperFooter>
    </>
  );
}
