import { useCallback, useEffect, useState } from 'react';
import FeesFarmingApi from '../../api/FeesFarmingApi';
import BigNumber from 'bignumber.js';
import { NotificationLevel, TezosStateType, useNotify, useTezosWalletContext } from '@wrap-dapps/components';

export interface NewStake {
  amount: string;
  contract: string;
  farmStakedToken: string;
  stakeDecimals: number;
}

export enum StakeAllStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  NOT_READY = 'NOT_READY',
  READY = 'READY',
  UNSTAKING = 'UNSTAKING',
}

const nextStatus = (newStakes: NewStake[]) => {
  const balance = newStakes.reduce((acc, elt) => {
    const amount = new BigNumber(elt.amount);
    return amount.isNaN() ? acc : acc.plus(amount);
  }, new BigNumber(0));

  if (balance.gt(0)) {
    return StakeAllStatus.READY;
  }
  return StakeAllStatus.NOT_READY;
};

export default function useStakeAll(newStakes: NewStake[]) {
  const { state, tezosLibrary, tezosAccount } = useTezosWalletContext();
  const connected = state.type === TezosStateType.CONNECTED && tezosAccount() !== undefined;
  const [stakeAllStatus, setStatus] = useState(StakeAllStatus.NOT_CONNECTED);
  const notify = useNotify();

  useEffect(() => {
    if (!connected) {
      setStatus(StakeAllStatus.NOT_CONNECTED);
      return;
    }
    setStatus(nextStatus(newStakes));
  }, [connected, newStakes]);

  const stakeAll = useCallback(async (newStakes: NewStake[], successCallback: (newStakes: NewStake[]) => void) => {
    const api = new FeesFarmingApi(tezosLibrary()!);
    setStatus(StakeAllStatus.UNSTAKING);
    try {
      await api.stakeAll(newStakes, tezosAccount()!);
      successCallback(newStakes);
      setStatus(StakeAllStatus.NOT_READY);
      notify(NotificationLevel.SUCCESS, 'Staking operation sent to blockchain');
    } catch (error) {
      notify(NotificationLevel.ERROR, error.description);
      setStatus(StakeAllStatus.READY);
    }
  }, [tezosLibrary, notify]);

  return {
    stakeAllStatus,
    stakeAll
  };
}