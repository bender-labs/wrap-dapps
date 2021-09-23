import { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { LiquidityMiningApi } from '../api/LiquidityMiningApi';
import { TezosStateType, useTezosWalletContext } from '@wrap-dapps/components';

const initialState = {
  totalSupply: new BigNumber(''),
  staked: new BigNumber(''),
  reward: new BigNumber('')
};

export default function useFarmingContract(farmingContract: string) {
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState(initialState);
  const { state: tezosState, tezosAccount, tezosLibrary } = useTezosWalletContext();

  const refresh = useCallback(async () => {
    setLoading(true);
    const r = await new LiquidityMiningApi(tezosLibrary()!).extractBalances(
      farmingContract,
      tezosAccount()!
    );
    setLoading(false);
    setBalances(r);
  }, [tezosLibrary, farmingContract, tezosAccount]);

  useEffect(() => {
    if (tezosState.type !== TezosStateType.CONNECTED || !tezosAccount()) {
      setBalances(initialState);
      return;
    }
    // noinspection JSIgnoredPromiseFromCall
    refresh();
  }, [refresh, tezosState, tezosAccount]);

  return {
    contractLoading: loading,
    refreshWrapStackingContract: refresh,
    contractBalances: balances
  };
}
