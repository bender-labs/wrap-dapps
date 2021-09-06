import { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import FarmingContractApi from '../../api/FarmingContractApi';
import { TezosStateType, useTezosWalletContext } from '@wrap-dapps/components';

const initialState = {
  totalSupply: new BigNumber(''),
  staked: new BigNumber(''),
  reward: new BigNumber('')
};

export default function useFarmingContract(farmingContractAddress: string) {
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState(initialState);
  const { tezosAccount, tezosLibrary, state } = useTezosWalletContext();

  const refresh = useCallback(async () => {
    setLoading(true);
    const r = await new FarmingContractApi(tezosLibrary()!).extractBalances(
      farmingContractAddress,
      tezosAccount()!
    );
    setLoading(false);
    setBalances(r);
  }, [tezosLibrary, farmingContractAddress, tezosAccount]);

  useEffect(() => {
    if (state.type === TezosStateType.CONNECTED || !tezosAccount) {
      setBalances(initialState);
      return;
    }
    // noinspection JSIgnoredPromiseFromCall
    refresh();
  }, [refresh, state, tezosAccount]);

  return {
    farmLoading: loading,
    refreshFarmingContract: refresh,
    farmBalances: balances
  };
}
