import React, { useCallback } from 'react';
import { AssetSummary, LoadableButton, PaperFooter, TezosConnectionButton } from '@wrap-dapps/components';
import useClaim, { ClaimStatus } from './hook/useClaim';
import { FarmingContractActionsProps } from './types';
import { LiquidityMiningContractInfo } from './components/LiquidityMiningContractInfo';
import { LiquidityMiningContractHeader } from './components/LiquidityMiningContractHeader';

export function Claim({
                        program,
                        contractBalances,
                        balance,
                        onApply
                      }: FarmingContractActionsProps) {
  const { claim, claimStatus } = useClaim(program);

  const handleClaim = useCallback(async () => {
    await claim();
    onApply();
  }, [onApply, claim]);

  return (
    <>
      <LiquidityMiningContractHeader program={program} />
      <LiquidityMiningContractInfo
        program={program}
        contractBalances={contractBalances}
        balance={balance}
      />
      <AssetSummary
        decimals={program.reward.decimals}
        symbol={program.reward.symbol}
        label={'Your will receive (estimate)'}
        value={contractBalances.reward}
      />
      <PaperFooter>
        {claimStatus !== ClaimStatus.NOT_CONNECTED && (
          <LoadableButton
            loading={claimStatus === ClaimStatus.CLAIMING}
            onClick={handleClaim}
            disabled={claimStatus !== ClaimStatus.READY}
            text={'Claim'}
            variant={'contained'}
          />
        )}
        {claimStatus === ClaimStatus.NOT_CONNECTED && (
          <TezosConnectionButton />
        )}
      </PaperFooter>
    </>
  );
}
