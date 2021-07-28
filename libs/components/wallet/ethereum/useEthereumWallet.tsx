import connectorsFactory, { EthConnector } from './connectorsFactory';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
  connectAction,
  disconnectAction,
  EthereumState,
  reducer,
} from './state';
import { useWeb3React } from '@web3-react/core';
import constate from 'constate';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useEthereumConfig } from '../../configuration';

function useEthereumWallet() {
  const ethereumConfig = useEthereumConfig();
  const { activate, account, library, deactivate } = useWeb3React();
  const [state, dispatch] = useReducer(reducer, EthereumState.notConnected());
  const connectors = useMemo(() => connectorsFactory(ethereumConfig), [ethereumConfig]);

  const doActivate = useCallback(async (connector: EthConnector) => {
    dispatch(connectAction.started(undefined));
    try {
      await activate(connector.connector, undefined, true);
    } catch (e) {
      dispatch(
        connectAction.failed({ error: 'Could not connect to your wallet' })
      );
    }
  }, []);

  useEffect(() => {
    dispatch(
      account
        ? connectAction.done({
            result: {
              ethereumToolkit: library!,
              account: account!,
              network: '',
            },
          })
        : disconnectAction()
    );
  }, [account]);

  useEffect(() => {
    (connectors.injected.connector as InjectedConnector)
      .isAuthorized()
      .then((isAuthorized: boolean) => {
        if (isAuthorized) {
          // noinspection JSIgnoredPromiseFromCall
          doActivate(connectors.injected);
        }
      });
  }, []);

  return { state, connectors, activate: doActivate, deactivate: deactivate };
}

export const [EthereumWalletProvider, useEthereumWalletContext] =
  constate(useEthereumWallet);
