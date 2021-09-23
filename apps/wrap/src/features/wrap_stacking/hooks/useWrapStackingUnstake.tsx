import BigNumber from 'bignumber.js';
import {
  NotificationLevel,
  StackingConfig,
  TezosStateType,
  useNotify,
  useTezosWalletContext
} from '@wrap-dapps/components';
import { useCallback, useEffect, useState } from 'react';
import { WrapStackingApi } from '../api/WrapStackingApi';

export enum WrapStackingUnstakeStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  NOT_READY = 'NOT_READY',
  READY = 'READY',
  UNSTAKING = 'UNSTAKING',
}

const nextStatus = (balance: BigNumber, amount: BigNumber) => {
  if (balance.gte(amount)) {
    return WrapStackingUnstakeStatus.READY;
  }
  return WrapStackingUnstakeStatus.NOT_READY;
};

export default function useWrapStackingUnstake(stacking: StackingConfig, balance: BigNumber) {
  const { state, tezosAccount, tezosLibrary } = useTezosWalletContext();
  const [unstakeStatus, setStatus] = useState(WrapStackingUnstakeStatus.NOT_CONNECTED);
  const connected = state.type === TezosStateType.CONNECTED && tezosAccount() !== undefined;
  const [amount, setAmount] = useState(new BigNumber(''));
  const notify = useNotify();

  useEffect(() => {
    if (!connected) {
      setStatus(WrapStackingUnstakeStatus.NOT_CONNECTED);
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
    const api = new WrapStackingApi(tezosLibrary()!);
    setStatus(WrapStackingUnstakeStatus.UNSTAKING);
    try {
      await api.unstake(amount, stacking, 2);
      setAmount(new BigNumber(''));
      setStatus(WrapStackingUnstakeStatus.NOT_READY);
      notify(NotificationLevel.SUCCESS, 'Unstaking done');
    } catch (error) {
      notify(NotificationLevel.ERROR, error.description);
      setStatus(WrapStackingUnstakeStatus.READY);
    }
  }, [tezosLibrary, amount, notify]);

  return {
    unstakeStatus,
    amount,
    changeAmount,
    unstake
  };
}
