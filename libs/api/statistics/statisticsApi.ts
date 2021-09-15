import axios, { AxiosInstance } from 'axios';

export interface StakingApy {
  asset: string;
  apy: string;
  apr: string;
  totalRewards: string;
  totalRewardsInUsd: string;
  totalStaked: string;
  totalStakedInUsd: string;
  startLevel: string;
  startTimestamp: string;
  farmingContract: string;
  duration: string;
}

export interface LiquidityMiningApy {
  base: string;
  quote: string;
  apy: string;
  apr: string;
  totalRewardsPerDay: string;
  totalRewardsPerDayInUsd: string;
  totalStakedInUsd: string;
  farmingContract: string;
  quipuswapContract: string;
  running: boolean;
  remainingBlocks: number;
  remainingSeconds: number;
}

export class StatisticsApi {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL, timeout: 3000 });
  }

  public fetchStakingApy(): Promise<StakingApy[]> {
    return this.client.get('/staking/apy').then(({ data }: { data: Array<StakingApy> }) => data);
  }

  public fetchLiquidityMiningApy(): Promise<Array<LiquidityMiningApy>> {
    return this.client.get(`/liquidity-mining/apy`).then(({ data }) => data);
  }
}
