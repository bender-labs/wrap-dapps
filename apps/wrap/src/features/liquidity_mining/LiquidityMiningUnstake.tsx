import React, { useCallback } from 'react';
import {
  AmountToWrapInput,
  AssetSummary,
  LoadableButton,
  PaperContent,
  PaperFooter,
  QuipuIcon,
  TezosConnectionButton
} from '@wrap-dapps/components';
import useUnstake, { UnstakeStatus } from './hook/useUnstake';
import { FarmingContractActionsProps } from './types';
import { LiquidityMiningContractInfo } from './components/LiquidityMiningContractInfo';
import { LiquidityMiningContractHeader } from './components/LiquidityMiningContractHeader';
import { styled, Typography } from '@mui/material';

;

const StyledTypography = styled(Typography)(() => ({
  fontSize: '10px'
}));

export function LiquidityMiningUnstake({
                          program,
                          onApply,
                          contractBalances,
                          balance
                        }: FarmingContractActionsProps) {
  const { unstakeStatus, amount, changeAmount, unstake } = useUnstake(
    program,
    contractBalances.staked
  );

  const handleWithdrawal = useCallback(async () => {
    await unstake();
    onApply();
  }, [onApply, unstake]);

  return (
    <>
      <LiquidityMiningContractHeader program={program} />
      <PaperContent>
        <AmountToWrapInput
          balance={contractBalances.staked}
          decimals={6}
          symbol={'LP Token'}
          onChange={changeAmount}
          amountToWrap={amount}
          balanceLoading={contractBalances.loading}
          disabled={
            unstakeStatus === UnstakeStatus.NOT_CONNECTED ||
            contractBalances.staked.isZero() ||
            contractBalances.staked.isNaN()
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
        value={contractBalances.staked.minus(amount)}
      />
      <PaperFooter>
        {unstakeStatus === UnstakeStatus.READY && (
          <StyledTypography> If you have pending rewards, it will be automatically claimed while
            unstaking</StyledTypography>
        )}
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
