import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { reducer, TezosState, TezosStateType } from './state';
import { activate, deactivate, initialize } from './effects';
import { beaconTezosWallet } from './beacon';
import { PermissionScope } from '@airgap/beacon-sdk';
import constate from 'constate';
import { useTezosConfig } from '@wrap-dapps/components/configuration';
import { useNotify } from '@wrap-dapps/components/notification';

type Props = {
  name: string;
};

function useTezosWallet({ name }: Props) {
  const notify = useNotify();
  const tezosConfig = useTezosConfig();
  const beaconWallet = useMemo(() => beaconTezosWallet(name), [name]);
  const [state, dispatch] = useReducer(reducer, TezosState.notConnected());
  const request = {
    network: {
      type: tezosConfig.networkId,
      rpcUrl: tezosConfig.rpcUrl
    },
    scopes: [PermissionScope.SIGN, PermissionScope.OPERATION_REQUEST]
  };

  const doDeactivate = deactivate(dispatch, beaconWallet, notify);
  const doActivate = () => activate(dispatch, beaconWallet, notify)(request);

  useEffect(() => {
    initialize(dispatch, beaconWallet, notify)(request);
  }, [tezosConfig]);

  const tezosAccount = useCallback(() => {
    if (state.type === TezosStateType.CONNECTED) {
      return state.tezosAccount;
    }
    return undefined;
  }, [state]);

  const tezosLibrary = useCallback(() => {
    if (state.type === TezosStateType.CONNECTED) {
      return state.tezosToolkit;
    }
    return undefined;
  }, [state]);

  return { state, activate: doActivate, deactivate: doDeactivate, tezosAccount, tezosLibrary };
}

export const [TezosWalletProvider, useTezosWalletContext] =
  constate(useTezosWallet);
