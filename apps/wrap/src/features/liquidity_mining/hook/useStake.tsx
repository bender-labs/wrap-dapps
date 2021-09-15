import BigNumber from 'bignumber.js';
import { TezosStateType, useTezosWalletContext } from '@wrap-dapps/features';
import { NotificationLevel, ProgramConfig, useNotify } from '@wrap-dapps/components';
import { useCallback, useEffect, useState } from 'react';
import { LiquidityMiningApi } from '../api/LiquidityMiningApi';

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

export default function useStake(program: ProgramConfig, balance: BigNumber) {
  const { state: tezosState, tezosLibrary, tezosAccount } = useTezosWalletContext();
  const [stakingStatus, setStatus] = useState(StakingStatus.NOT_CONNECTED);
  const connected = tezosState.type === TezosStateType.CONNECTED && tezosAccount() !== undefined;
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
    const api = new LiquidityMiningApi(tezosLibrary()!);
    setStatus(StakingStatus.STAKING);
    try {
      await api.stake(
        tezosAccount()!,
        amount,
        program.pool.contract,
        program.farmingContract
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
    program.pool.contract,
    program.farmingContract,
    notify
  ]);

  return { stakingStatus, amount, changeAmount, stake };
}
