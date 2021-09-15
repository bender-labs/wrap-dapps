import BigNumber from 'bignumber.js';
import {
  FarmConfig,
  NotificationLevel,
  TezosStateType,
  useNotify,
  useTezosWalletContext
} from '@wrap-dapps/components';
import { useCallback, useEffect, useState } from 'react';
import FeesFarmingApi from '../../api/FeesFarmingApi';

export enum UnstakeStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  NOT_READY = 'NOT_READY',
  READY = 'READY',
  UNSTAKING = 'UNSTAKING',
}

const nextStatus = (balance: BigNumber, amount: BigNumber) => {
  if (balance.gte(amount)) {
    return UnstakeStatus.READY;
  }
  return UnstakeStatus.NOT_READY;
};

export default function useUnstake(farm: FarmConfig, balance: BigNumber) {
  const { state, tezosAccount, tezosLibrary } = useTezosWalletContext();
  const [unstakeStatus, setStatus] = useState(UnstakeStatus.NOT_CONNECTED);
  const connected = state.type === TezosStateType.CONNECTED && tezosAccount() !== undefined;
  const [amount, setAmount] = useState(new BigNumber(''));
  const notify = useNotify();

  useEffect(() => {
    if (!connected) {
      setStatus(UnstakeStatus.NOT_CONNECTED);
      setAmount(new BigNumber(''));
      return;
    }
    setStatus(nextStatus(balance, amount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  useEffect(() => {
    if (!connected) {
      return;
    }
    setStatus(nextStatus(balance, amount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance]);

  const changeAmount = useCallback(
    (amt: BigNumber) => {
      setAmount(amt);
      setStatus(nextStatus(balance, amt));
    },
    [balance]
  );

  const unstake = useCallback(async () => {
    const api = new FeesFarmingApi(tezosLibrary()!);
    setStatus(UnstakeStatus.UNSTAKING);
    try {
      await api.unstake(amount, farm.farmContractAddress);
      setAmount(new BigNumber(''));
      setStatus(UnstakeStatus.NOT_READY);
      notify(NotificationLevel.SUCCESS, 'Unstaking done');
    } catch (error) {
      notify(NotificationLevel.ERROR, error.description);
      setStatus(UnstakeStatus.READY);
    }
  }, [tezosLibrary, amount, farm.farmContractAddress, notify]);

  return {
    unstakeStatus,
    amount,
    changeAmount,
    unstake
  };
}
