import { StackingConfig } from '@wrap-dapps/components';
import BigNumber from 'bignumber.js';
import { WrapStackingStakeInfo } from './api/WrapStackingApi';

export interface WrapStackingContractInfoProps {
  stacking: StackingConfig;
  wrapStackingOwnerInfos: {
    totalSupply: BigNumber;
    staked: BigNumber;
    reward: BigNumber;
    stakes: WrapStackingStakeInfo[];
    loading: boolean;
  };
}

export interface WrapStackingContractActionProps extends WrapStackingContractInfoProps {
  balance: {
    value: BigNumber;
    loading: boolean;
  };
  onApply: () => void;
}
