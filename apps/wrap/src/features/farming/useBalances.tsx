import { Reducer, useEffect, useReducer } from 'react';
import { useIndexerApi, useTezosWalletContext } from '@wrap-dapps/components';
import { Action, connectStore, createStore } from '@wrap-dapps/features';
import { BalancesState, reducer, sideEffectReducer } from './balances-reducer';
import { fetchBalances } from './balance-actions';

export default function useBalances() {
  const { tezosAccount } = useTezosWalletContext();
  const indexerApi = useIndexerApi();
  const initialBalances: BalancesState = {
    isDirty: true,
    balances: []
  };
  const [balances, balanceDispatch] = useReducer<Reducer<BalancesState, Action>, BalancesState>(reducer, initialBalances, () => initialBalances);

  const effectsDispatch = connectStore(
    createStore(balances, balanceDispatch),
    sideEffectReducer(indexerApi)
  );

  useEffect(() => {
    const loadBalances = async () => {
      if (tezosAccount()) {
        effectsDispatch(fetchBalances({ tezosAccount: tezosAccount()! }));
      }
    };

    const timer = setInterval(() => {
      // noinspection JSIgnoredPromiseFromCall
      loadBalances();
    }, 15000);

    // noinspection JSIgnoredPromiseFromCall
    loadBalances();

    return () => clearInterval(timer);
  }, [tezosAccount, indexerApi]);

  return { balances, balanceDispatch };
};