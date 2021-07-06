import { useMemo, useReducer } from 'react';
import { reducer, TezosState } from './state';
import { activate, deactivate } from './effects';
import { beaconTezosWallet } from './beacon';
import { NetworkType, PermissionScope } from '@airgap/beacon-sdk';
import constate from 'constate';

type Props = {
  name: string;
};

export function useTezosWallet({ name }: Props) {
  const beaconWallet = useMemo(() => beaconTezosWallet(name), [name]);
  const [state, dispatch] = useReducer(reducer, TezosState.notConnected());
  const request = {
    network: {
      type: NetworkType.FLORENCENET,
      rpcUrl: 'https://florencenet.smartpy.io/',
    },
    scopes: [PermissionScope.SIGN, PermissionScope.OPERATION_REQUEST],
  };
  const doDeactivate = deactivate(dispatch, beaconWallet);
  const doActivate = () => activate(dispatch, beaconWallet)(request);

  return { state, activate: doActivate, deactivate: doDeactivate };
}

export const [TezosWalletProvider, useTezosWalletContext] =
  constate(useTezosWallet);