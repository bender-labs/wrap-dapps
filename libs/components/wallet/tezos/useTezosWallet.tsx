import { useEffect, useMemo, useReducer } from 'react';
import { reducer, TezosState } from './state';
import { activate, deactivate, initialise } from './effects';
import { beaconTezosWallet } from './beacon';
import { NetworkType, PermissionScope } from '@airgap/beacon-sdk';
import constate from 'constate';
import { Notify } from '../../notification/types';

type Props = {
  name: string;
  notify: Notify;
  rpcUrl: string;
  networkType: NetworkType;
};

function useTezosWallet({ name, notify, rpcUrl, networkType }: Props) {
  const beaconWallet = useMemo(() => beaconTezosWallet(name), [name]);
  const [state, dispatch] = useReducer(reducer, TezosState.notConnected());
  const request = {
    network: {
      type: networkType,
      rpcUrl: rpcUrl,
    },
    scopes: [PermissionScope.SIGN, PermissionScope.OPERATION_REQUEST],
  };

  const doDeactivate = deactivate(dispatch, beaconWallet);
  const doActivate = () => activate(dispatch, beaconWallet, notify)(request);

  useEffect(() => {
    initialise(dispatch, beaconWallet)(request);
  }, []);

  return { state, activate: doActivate, deactivate: doDeactivate };
}

export const [TezosWalletProvider, useTezosWalletContext] =
  constate(useTezosWallet);
