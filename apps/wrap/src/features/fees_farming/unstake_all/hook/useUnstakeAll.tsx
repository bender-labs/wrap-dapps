import { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import FeesFarmingApi from '../../api/FeesFarmingApi';
import { ContractBalance } from '../../balances-reducer';
import { NotificationLevel, TezosStateType, useNotify, useTezosWalletContext } from '@wrap-dapps/components';

export enum UnstakeAllStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  NOT_READY = 'NOT_READY',
  READY = 'READY',
  UNSTAKING = 'UNSTAKING',
}

const nextStatus = (balances: ContractBalance[]) => {
  const balance = balances.reduce((acc, elt) => {
    return acc.plus(elt.balance ?? '0');
  }, new BigNumber(0));

  if (balance.gt(0)) {
    return UnstakeAllStatus.READY;
  }
  return UnstakeAllStatus.NOT_READY;
};

export default function useUnstakeAll(stakingBalances: ContractBalance[]) {
  const { state, tezosLibrary, tezosAccount } = useTezosWalletContext();
  const [unstakeAllStatus, setStatus] = useState(UnstakeAllStatus.NOT_CONNECTED);
  const connected = state.type === TezosStateType.CONNECTED && tezosAccount() !== undefined;
  const notify = useNotify();

  useEffect(() => {
    if (!connected) {
      setStatus(UnstakeAllStatus.NOT_CONNECTED);
      return;
    }
    setStatus(nextStatus(stakingBalances));
  }, [connected, stakingBalances]);

  const unstakeAll = useCallback(async (successCallback: () => void) => {
    const api = new FeesFarmingApi(tezosLibrary()!);
    setStatus(UnstakeAllStatus.UNSTAKING);
    try {
      await api.unstakeAll(stakingBalances);
      successCallback();
      setStatus(UnstakeAllStatus.NOT_READY);
      notify(NotificationLevel.SUCCESS, 'Unstaking operation sent to blockchain');
    } catch (error) {
      notify(NotificationLevel.ERROR, error.description);
      setStatus(UnstakeAllStatus.READY);
    }
  }, [tezosLibrary, stakingBalances, notify]);

  return {
    unstakeAllStatus,
    unstakeAll
  };
}
