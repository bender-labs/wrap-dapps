import { useEffect, useMemo, useReducer } from 'react';
import { reducer, TezosState } from './state';
import { activate, deactivate, initialize } from './effects';
import { beaconTezosWallet } from './beacon';
import { PermissionScope } from '@airgap/beacon-sdk';
import constate from 'constate';
import { useTezosConfig } from '../../configuration';
import { useNotify } from '../../notification';

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
  }, []);

  return { state, activate: doActivate, deactivate: doDeactivate };
}

export const [TezosWalletProvider, useTezosWalletContext] =
  constate(useTezosWallet);
