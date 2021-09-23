import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import {
  NotificationLevel,
  StackingConfig,
  TezosStateType,
  useNotify,
  useTezosWalletContext
} from '@wrap-dapps/components';
import { WrapStackingApi } from '../api/WrapStackingApi';

export enum WrapStakingStakeStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  NOT_READY = 'NOT_READY',
  READY = 'READY',
  STAKING = 'STAKING',
}

const nextStatus = (balance: BigNumber, amount: BigNumber) => {
  if (balance.gte(amount)) {
    return WrapStakingStakeStatus.READY;
  }
  return WrapStakingStakeStatus.NOT_READY;
};

export function useWrapStackingStake(stacking: StackingConfig, balance: BigNumber) {
  const { state, tezosAccount, tezosLibrary } = useTezosWalletContext();
  const [stakingStatus, setStatus] = useState(WrapStakingStakeStatus.NOT_CONNECTED);
  const connected = state.type === TezosStateType.CONNECTED && tezosAccount() !== undefined;
  const [amount, setAmount] = useState(new BigNumber(''));
  const notify = useNotify();

  useEffect(() => {
    if (!connected) {
      setStatus(WrapStakingStakeStatus.NOT_CONNECTED);
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

  const stake = useCallback(async () => {
    const api = new WrapStackingApi(tezosLibrary()!);
    setStatus(WrapStakingStakeStatus.STAKING);
    try {
      await api.stake(
        tezosAccount()!,
        amount,
        stacking
      );
      setAmount(new BigNumber(''));
      setStatus(WrapStakingStakeStatus.NOT_READY);
      notify(NotificationLevel.SUCCESS, 'Staking done');
    } catch (error) {
      notify(NotificationLevel.ERROR, error.description);
      setStatus(WrapStakingStakeStatus.READY);
    }
  }, [
    tezosLibrary,
    tezosAccount,
    amount,
    notify
  ]);

  return { stakingStatus, amount, changeAmount, stake };
}
