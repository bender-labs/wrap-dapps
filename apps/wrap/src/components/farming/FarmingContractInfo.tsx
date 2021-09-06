import { FarmingContractInfoProps } from '../../features/farming/types';
import { LabelAndAsset, LabelAndValue, PaperContent } from '@wrap-dapps/components';
import { Link } from '@material-ui/core';
import BigNumber from 'bignumber.js';

export default function FarmingContractInfo({ farm, farmBalances }: FarmingContractInfoProps) {
  return (
    <PaperContent alternate>
      <LabelAndValue
        label={'Farm contract'}
        value={
          <Link
            target={'_blank'}
            color={'textSecondary'}
            rel={'noreferrer'}
            href={farm.farmContractLink}
          >
            {farm.farmContractAddress}
          </Link>
        }
      />
      <LabelAndAsset
        label={'Total staked tokens'}
        value={farmBalances.totalSupply}
        emptyState={farmBalances.loading}
        emptyStatePlaceHolder={'Loading…'}
        decimals={farm.farmStakedToken.decimals}
        symbol={farm.farmStakedToken.symbol}
      />
      <LabelAndAsset
        label={'Your current staked tokens'}
        value={farmBalances.staked}
        emptyState={farmBalances.loading}
        emptyStatePlaceHolder={'Loading…'}
        decimals={farm.farmStakedToken.decimals}
        symbol={farm.farmStakedToken.symbol}
      />
      {farm.rewards ?
        <LabelAndAsset
          label={'Current available rewards'}
          value={new BigNumber(farm.rewards.totalRewards)}
          emptyState={farmBalances.loading}
          emptyStatePlaceHolder={'Loading…'}
          decimals={farm.rewardTokenDecimals}
          symbol={farm.rewardTokenSymbol}
        />
        : null}
      <LabelAndAsset
        label={'Your pending reward'}
        value={farmBalances.reward}
        emptyState={farmBalances.loading}
        emptyStatePlaceHolder={'Loading…'}
        decimals={farm.rewardTokenDecimals}
        symbol={farm.rewardTokenSymbol}
      />
    </PaperContent>
  );
}
