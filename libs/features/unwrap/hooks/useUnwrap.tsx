import { useCallback, useEffect, useReducer } from 'react';
import BigNumber from 'bignumber.js';
import { useConfig, useNotify } from '@wrap-dapps/components';
import { useEthereumWalletContext, useTezosWalletContext } from '../../wallet';
import { TokenMetadata } from '../../swap';
import { reducer, sideEffectReducer, UnwrapStatus } from './reducer';
import {
  amountToUnwrapChange,
  estimateFees,
  fetchMetadata,
  runUnwrap,
  toggleAgreement,
  tokenSelect,
  walletChange
} from './actions';
import { connectStore, createStore } from '../../types';

function getFirstTokenByName(tokens: Record<string, TokenMetadata>) {
  return Object.entries(tokens)
    .sort(([key1,
             metadata1],
           [, metadata2]) => {
      if (metadata1.ethereumName > metadata2.ethereumName) return 1;
      if (metadata1.ethereumName < metadata2.ethereumName) return -1;
      return 0;
    })[0];
}

export function useUnwrap() {
  const notify = useNotify();

  const {
    fungibleTokens,
    fees,
    tezos: { minterContractAddress }
  } = useConfig();

  const { tezosAccount, tezosLibrary } = useTezosWalletContext();
  const { ethereumAccount, ethereumLibrary } = useEthereumWalletContext();

  useEffect(() => {
    dispatch(
      walletChange({
        ethLibrary: ethereumLibrary(),
        ethAccount: ethereumAccount(),
        tezosAccount: tezosAccount(),
        tezosLibrary: tezosLibrary()
      })
    );
  }, [tezosLibrary, tezosAccount, ethereumLibrary, ethereumAccount]);

  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    status: UnwrapStatus.UNINITIALIZED,
    token: getFirstTokenByName(fungibleTokens)[0] || '',
    connected: false,
    contract: null,
    minterContractAddress,
    currentBalance: new BigNumber(''),
    balanceNotYetFetched: true,
    amountToUnwrap: new BigNumber(''),
    fees
  });

  const effectDispatch = connectStore(
    createStore(state, dispatch),
    sideEffectReducer(notify)
  );

  const selectToken = useCallback((token: string) => {
    dispatch(
      tokenSelect({
        token
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectAmountToUnwrap =
    useCallback((amountToUnwrap: BigNumber) => {
      dispatch(
        amountToUnwrapChange({
          amountToUnwrap
        })
      );
    }, []);

  const agree = (v: boolean) => dispatch(toggleAgreement(v));

  useEffect(() => {
    const loadMetadata = async () => {
      if (!state.token || !state.contractFactory) {
        return;
      }
      const {
        ethereumContractAddress,
        tezosWrappingContract,
        tezosTokenId
      } = fungibleTokens[state.token];
      effectDispatch(
        fetchMetadata({
          ethereumContract: ethereumContractAddress,
          tezosContract: tezosWrappingContract,
          tezosTokenId
        })
      );
    };
    // noinspection JSIgnoredPromiseFromCall
    loadMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.token, state.contractFactory]);

  const launchUnwrap = () => {
    const { contract } = state;
    if (contract == null) return Promise.reject('Not ready');
    effectDispatch(
      runUnwrap.started({
        ethereumContract: fungibleTokens[state.token].ethereumContractAddress,
        fees,
        tezosAccount: tezosAccount()!,
        ethAccount: ethereumAccount()!
      })
    );
  };

  const runNetworkFeesEstimate = () => {
    effectDispatch(estimateFees.started({}));
  };

  return {
    ...state,
    selectToken,
    selectAmountToUnwrap: selectAmountToUnwrap,
    agree,
    launchUnwrap,
    runNetworkFeesEstimate,
    fungibleTokens,
    fees,
    tezosAccount,
    ethereumAccount
  };
}
