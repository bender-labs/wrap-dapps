import React, { useCallback } from 'react';
import useStake, { StakingStatus } from './hook/useStake';
import { AmountToWrapInput, AssetSummary, LoadableButton, PaperContent, PaperFooter, TezosConnectionButton, QuipuIcon } from '@wrap-dapps/components';
import { FarmingContractActionsProps } from './types';
import { LiquidityMiningContractInfo } from './components/LiquidityMiningContractInfo';
import { LiquidityMiningContractHeader } from './components/LiquidityMiningContractHeader';
import { styled, Typography } from '@mui/material';

const StyledTypography = styled(Typography)(() => ({
  fontSize: '10px'
}));

export function LiquidityMiningStake({ program, contractBalances, onApply, balance }: FarmingContractActionsProps) {
  const { amount, changeAmount, stakingStatus, stake } = useStake(
    program,
    balance.value
  );

  const handleStake = useCallback(async () => {
    await stake();
    onApply();
  }, [onApply, stake]);

  return (
    <>
      <LiquidityMiningContractHeader program={program} />
      <PaperContent>
        <AmountToWrapInput
          balance={balance.value}
          decimals={6}
          symbol={'LP Token'}
          onChange={changeAmount}
          amountToWrap={amount}
          balanceLoading={balance.loading}
          disabled={
            stakingStatus === StakingStatus.NOT_CONNECTED ||
            balance.value.isZero() ||
            balance.value.isNaN()
          }
          icon={QuipuIcon}
        />
      </PaperContent>
      <LiquidityMiningContractInfo
        program={program}
        contractBalances={contractBalances}
        balance={balance}
      />
      <AssetSummary
        decimals={6}
        symbol={'LP Token'}
        label={'Your new share will be'}
        value={amount.plus(contractBalances.staked)}
      />
      <PaperFooter>
        {stakingStatus === StakingStatus.READY && (
          <StyledTypography> If you have pending rewards, it will be automatically claimed while
            staking</StyledTypography>
        )}
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
          <TezosConnectionButton/>
        )}
      </PaperFooter>
    </>
  );
}
