import { useEffect, useMemo, useReducer } from 'react';
import { reducer, TezosState } from './state';
import { activate, deactivate, initialise } from './effects';
import { beaconTezosWallet } from './beacon';
import { NetworkType, PermissionScope } from '@airgap/beacon-sdk';
import constate from 'constate';
import { Notify } from '../../notification/types';
import { useTezosConfig } from '../../configuration';

type Props = {
  name: string;
  notify: Notify;
};

function useTezosWallet({ name, notify }: Props) {
  const tezosConfig = useTezosConfig();
  const beaconWallet = useMemo(() => beaconTezosWallet(name), [name]);
  const [state, dispatch] = useReducer(reducer, TezosState.notConnected());
  const request = {
    network: {
      type: tezosConfig.networkId,
      rpcUrl: tezosConfig.rpcUrl,
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
