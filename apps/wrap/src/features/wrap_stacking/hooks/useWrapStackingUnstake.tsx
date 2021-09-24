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
import { WrapUnstakeInfo } from '../WrapStackingUnstake';

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

export default function useWrapStackingUnstake(stacking: StackingConfig, balance: BigNumber, wrapUnstakesInfos: WrapUnstakeInfo[]) {
  const { state, tezosAccount, tezosLibrary } = useTezosWalletContext();
  const [unstakeStatus, setStatus] = useState(WrapStackingUnstakeStatus.NOT_CONNECTED);
  const connected = state.type === TezosStateType.CONNECTED && tezosAccount() !== undefined;
  const [amount, setAmount] = useState(new BigNumber(0));
  const [fees, setFees] = useState(new BigNumber(0));
  const notify = useNotify();

  useEffect(() => {
    if (!connected) {
      setStatus(WrapStackingUnstakeStatus.NOT_CONNECTED);
      setAmount(new BigNumber(''));
      setFees(new BigNumber(''));
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

  const isValidWrapUnstakeInfos = (wrapUnstakesInfos: WrapUnstakeInfo): boolean => {
    return wrapUnstakesInfos.mustUnstake && wrapUnstakesInfos.amount.isGreaterThan(0) && wrapUnstakesInfos.amount.isLessThanOrEqualTo(wrapUnstakesInfos.maxAmount);
  };

  useEffect(() => {
    if (!connected) {
      return;
    }
    const amount = wrapUnstakesInfos
      .filter(wrapUnstakesInfos => isValidWrapUnstakeInfos(wrapUnstakesInfos))
      .map(wrapUnstakeInfos => wrapUnstakeInfos.amount)
      .reduce((acc, val) => {
        return acc.plus(val);
      }, new BigNumber(0));
    const fees = wrapUnstakesInfos
      .filter(wrapUnstakesInfos => isValidWrapUnstakeInfos(wrapUnstakesInfos))
      .reduce((acc, val) => {
        return acc.plus(val.amount.multipliedBy(val.fees).dividedBy(100));
      }, new BigNumber(0));
    setAmount(amount);
    setFees(fees);
    setStatus(nextStatus(balance, amount));
  }, [balance, wrapUnstakesInfos]);

  const unstake = useCallback(async () => {
    const api = new WrapStackingApi(tezosLibrary()!);
    setStatus(WrapStackingUnstakeStatus.UNSTAKING);
    try {
      await api.unstake(stacking, wrapUnstakesInfos.filter(wrapUnstakeInfos => isValidWrapUnstakeInfos(wrapUnstakeInfos)));
      setAmount(new BigNumber(''));
      setStatus(WrapStackingUnstakeStatus.NOT_READY);
      notify(NotificationLevel.SUCCESS, 'Unstaking done');
    } catch (error) {
      notify(NotificationLevel.ERROR, error.description);
      setStatus(WrapStackingUnstakeStatus.READY);
    }
  }, [tezosLibrary, amount, notify, wrapUnstakesInfos]);

  return {
    unstakeStatus,
    amount,
    fees,
    unstake
  };
}
