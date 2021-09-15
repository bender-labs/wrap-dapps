import React from 'react';
import { LabelAndAsset, LabelAndValue, PaperContent } from '@wrap-dapps/components';
import { Link } from '@mui/material';
import { FarmingContractInfoProps } from '../types';

export function LiquidityMiningContractInfo({ program, contractBalances }: FarmingContractInfoProps) {
  return (
    <PaperContent alternate>
      <LabelAndValue
        label={'Pool contract'}
        value={
          <Link
            target={'_blank'}
            color={'textSecondary'}
            rel={'noreferrer'}
            href={`https://quipuswap.com/invest/add-liquidity/${program.pool.base.contractAddress}_${program.pool.base.tokenId}`}
          >
            {program.pool.contract}
          </Link>
        }
      />
      <LabelAndAsset
        label={'Total staked'}
        emptyState={contractBalances.loading}
        emptyStatePlaceHolder={'Loading…'}
        value={contractBalances.totalSupply}
        decimals={6}
        symbol={'LP Token'}
      />
      <LabelAndAsset
        label={'Your current share'}
        value={contractBalances.staked}
        emptyState={contractBalances.loading}
        emptyStatePlaceHolder={'Loading…'}
        decimals={6}
        symbol={'LP Token'}
      />
      <LabelAndAsset
        label={'Your pending reward'}
        value={contractBalances.reward}
        emptyState={contractBalances.loading}
        emptyStatePlaceHolder={'Loading…'}
        decimals={program.reward.decimals}
        symbol={'WRAP'}
      />
    </PaperContent>
  );
}
