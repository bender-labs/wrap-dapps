import connectorsFactory, { EthConnector } from './connectorsFactory';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { connectAction, disconnectAction, EthereumState, EthereumStateType, reducer } from './state';
import { useWeb3React } from '@web3-react/core';
import constate from 'constate';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useEthereumConfig } from '../../configuration';
import { useNotify } from '../../notification';
import { NotificationLevel } from '../../notification/types';

function useEthereumWallet() {
  const ethereumConfig = useEthereumConfig();
  const notify = useNotify();
  const { activate, account, library, deactivate } = useWeb3React();
  const [state, dispatch] = useReducer(reducer, EthereumState.notConnected());
  const connectors = useMemo(() => connectorsFactory(ethereumConfig), [ethereumConfig]);

  const doActivate = useCallback(async (connector: EthConnector) => {
    dispatch(connectAction.started(undefined));
    try {
      await activate(connector.connector, (error) => {
        console.log(error.message);
      }, true);
    } catch (e) {
      dispatch(
        connectAction.failed({ error: 'Could not connect to your wallet' })
      );
      notify(NotificationLevel.ERROR, 'Could not connect to your Ethereum wallet');
    }
  }, []);

  useEffect(() => {
    if (account) {
      if (state.type !== EthereumStateType.CONNECTED) {
        dispatch(
          connectAction.done({
            result: {
              ethereumToolkit: library!,
              account: account!,
              network: ''
            }
          })
        );
        notify(NotificationLevel.SUCCESS, 'Connected to your Ethereum wallet');
      }
    } else {
      if (state.type === EthereumStateType.CONNECTED) {
        deactivate();
        dispatch(disconnectAction());
        notify(NotificationLevel.SUCCESS, 'Disconnected from your Ethereum wallet');
      }
    }
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
