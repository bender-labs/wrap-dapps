import React from 'react';
import { LabelAndAsset, LabelAndValue, PaperContent } from '@wrap-dapps/components';
import { Link } from '@mui/material';
import { WrapStackingContractInfoProps } from '../types';

export function WrapStackingContractInfo({ stacking, wrapStackingOwnerInfos }: WrapStackingContractInfoProps) {
  return (
    <PaperContent alternate>
      <LabelAndValue
        label={'Stacking contract'}
        value={
          <Link
            target={'_blank'}
            color={'textSecondary'}
            rel={'noreferrer'}
            href={`${stacking.stackingContractLink}`}
          >
            ${stacking.stackingContract}
          </Link>
        }
      />
      <LabelAndAsset
        label={'Total staked'}
        emptyState={wrapStackingOwnerInfos.loading}
        emptyStatePlaceHolder={'Loading…'}
        value={wrapStackingOwnerInfos.totalSupply}
        decimals={8}
        symbol={'$WRAP'}
      />
      <LabelAndAsset
        label={'Your current share'}
        value={wrapStackingOwnerInfos.staked}
        emptyState={wrapStackingOwnerInfos.loading}
        emptyStatePlaceHolder={'Loading…'}
        decimals={8}
        symbol={'$WRAP'}
      />
      <LabelAndAsset
        label={'Your pending reward'}
        value={wrapStackingOwnerInfos.reward}
        emptyState={wrapStackingOwnerInfos.loading}
        emptyStatePlaceHolder={'Loading…'}
        decimals={stacking.reward.decimals}
        symbol={'WRAP'}
      />
    </PaperContent>
  );
}
