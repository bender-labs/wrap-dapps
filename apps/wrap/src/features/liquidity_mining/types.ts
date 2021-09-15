import { ProgramConfig } from '@wrap-dapps/components';
import BigNumber from 'bignumber.js';

export interface FarmingContractInfoProps {
  program: ProgramConfig;
  contractBalances: {
    totalSupply: BigNumber;
    staked: BigNumber;
    reward: BigNumber;
    loading: boolean;
  };
  balance: {
    value: BigNumber;
    loading: boolean;
  };
}

export interface FarmingContractActionsProps extends FarmingContractInfoProps {
  onApply: () => void;
}
