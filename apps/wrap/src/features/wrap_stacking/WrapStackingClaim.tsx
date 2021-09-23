import React, { useCallback } from 'react';
import { AssetSummary, LoadableButton, PaperFooter, TezosConnectionButton } from '@wrap-dapps/components';
import { WrapStackingContractActionProps } from './types';
import { WrapStackingContractInfo } from './components/WrapStackingContractInfo';
import { WrapStackingContractHeader } from './components/WrapStackingContractHeader';
import useWrapStackingClaim, { WrapStackingClaimStatus } from './hooks/useWrapStackingClaim';
import { paths } from '../../pages/routes';

export function WrapStackingClaim({
                                    stacking,
                                    wrapStackingOwnerInfos,
                                    balance,
                                    onApply
                                  }: WrapStackingContractActionProps) {
  const { claim, claimStatus, claimAndRestake } = useWrapStackingClaim(stacking, wrapStackingOwnerInfos.reward);

  const handleClaim = useCallback(async () => {
    await claim();
    onApply();
  }, [onApply, claim]);

  const handleClaimAndRestake = useCallback(async () => {
    await claimAndRestake();
    onApply();
  }, [onApply, claim]);

  return (
    <>
      <WrapStackingContractHeader path={paths.WRAP_STACKING} />
      <WrapStackingContractInfo
        wrapStackingOwnerInfos={wrapStackingOwnerInfos}
        stacking={stacking}
      />
      <AssetSummary
        decimals={stacking.reward.decimals}
        symbol={stacking.reward.symbol}
        label={'Your will receive (estimate)'}
        value={wrapStackingOwnerInfos.reward}
      />
      <PaperFooter>
        {claimStatus !== WrapStackingClaimStatus.NOT_CONNECTED && (
          <>
            <LoadableButton
              loading={claimStatus === WrapStackingClaimStatus.CLAIMING}
              onClick={handleClaim}
              disabled={claimStatus !== WrapStackingClaimStatus.READY}
              text={'Claim'}
              variant={'contained'}
            />
            <LoadableButton
              loading={claimStatus === WrapStackingClaimStatus.CLAIMING}
              onClick={handleClaimAndRestake}
              disabled={claimStatus !== WrapStackingClaimStatus.READY}
              text={'Claim and restake'}
              variant={'contained'}
            />
          </>
        )}
        {claimStatus === WrapStackingClaimStatus.NOT_CONNECTED && (
          <TezosConnectionButton />
        )}
      </PaperFooter>
    </>
  );
}
