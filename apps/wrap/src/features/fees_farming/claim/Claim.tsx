import { FarmingContractActionsProps } from '../types';
import useClaim, { ClaimStatus } from './hook/useClaim';
import React, { useCallback } from 'react';
import { AssetSummary, LoadableButton, PaperFooter, TezosConnectionButton } from '@wrap-dapps/components';
import FarmingContractInfo from '../components/FarmingContractInfo';
import FarmingContractHeader from '../components/FarmingContractHeader';
import { paths } from '../../../pages/routes';

export default function Claim({ farm, farmBalances, inputBalance, onApply }: FarmingContractActionsProps) {
  const { claim, claimStatus } = useClaim(farm);

  const handleClaim = useCallback(async () => {
    await claim();
    onApply();
  }, [onApply, claim]);

  return (
    <>
      <FarmingContractHeader title={farm.rewardTokenName + ' farm'} path={paths.FARMING_ROOT} />
      <FarmingContractInfo
        farm={farm}
        farmBalances={farmBalances}
        inputBalance={inputBalance}
      />
      <AssetSummary
        decimals={farm.rewardTokenDecimals}
        symbol={farm.rewardTokenSymbol}
        label={'You will receive (estimate)'}
        value={farmBalances.reward}
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
