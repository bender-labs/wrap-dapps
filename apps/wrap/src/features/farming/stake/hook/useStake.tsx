import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import {
  FarmConfig,
  NotificationLevel,
  TezosStateType,
  useNotify,
  useTezosWalletContext
} from '@wrap-dapps/components';
import FarmingContractApi from '../../api/FarmingContractApi';

export enum StakingStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  NOT_READY = 'NOT_READY',
  READY = 'READY',
  STAKING = 'STAKING',
}

const nextStatus = (balance: BigNumber, amount: BigNumber) => {
  if (balance.gte(amount)) {
    return StakingStatus.READY;
  }
  return StakingStatus.NOT_READY;
};

export default function useStake(farm: FarmConfig, balance: BigNumber) {
  const { state, tezosAccount, tezosLibrary } = useTezosWalletContext();
  const [stakingStatus, setStatus] = useState(StakingStatus.NOT_CONNECTED);
  const connected = state.type === TezosStateType.CONNECTED && tezosAccount() !== undefined;
  const [amount, setAmount] = useState(new BigNumber(''));
  const notify = useNotify();

  useEffect(() => {
    if (!connected) {
      setStatus(StakingStatus.NOT_CONNECTED);
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
    const api = new FarmingContractApi(tezosLibrary()!);
    setStatus(StakingStatus.STAKING);
    try {
      await api.stake(
        tezosAccount()!,
        amount,
        farm.farmStakedToken.contractAddress,
        farm.farmContractAddress
      );
      setAmount(new BigNumber(''));
      setStatus(StakingStatus.NOT_READY);
      notify(NotificationLevel.SUCCESS, 'Staking done');
    } catch (error) {
      notify(NotificationLevel.ERROR, error.description);
      setStatus(StakingStatus.READY);
    }
  }, [
    tezosLibrary,
    tezosAccount,
    amount,
    farm,
    notify
  ]);

  return { stakingStatus, amount, changeAmount, stake };
}
