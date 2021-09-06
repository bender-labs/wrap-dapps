import { FarmConfig } from '@wrap-dapps/components';
import BigNumber from 'bignumber.js';

export interface FarmingContractInfoProps {
  farm: FarmConfig;
  farmBalances: {
    totalSupply: BigNumber;
    staked: BigNumber;
    reward: BigNumber;
    loading: boolean;
  };
  inputBalance: {
    value: BigNumber;
    loading: boolean;
  };
}

export interface FarmingContractActionsProps extends FarmingContractInfoProps {
  onApply: () => void;
}
