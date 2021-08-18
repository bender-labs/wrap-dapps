import { TezosToolkit } from '@taquito/taquito';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { NetworkType } from '@airgap/beacon-sdk';
import { ellipsizeAddress } from '../address';

export enum TezosStateType {
  NOT_CONNECTED,
  CONNECTED,
  CONNECTING,
}

export interface TezosNotConnected {
  type: TezosStateType.NOT_CONNECTED;
}

export interface TezosConnected {
  type: TezosStateType.CONNECTED;
  network: NetworkType;
  tezosAccount: string;
  tezosToolkit: TezosToolkit;
}

export interface TezosConnecting {
  type: TezosStateType.CONNECTING;
}

export type TezosState = TezosNotConnected | TezosConnected | TezosConnecting;

export const TezosState = {
  notConnected: () => ({ type: TezosStateType.NOT_CONNECTED } as TezosNotConnected),
  connected: (account: string, toolkit: TezosToolkit, network: NetworkType) =>
    ({
      type: TezosStateType.CONNECTED,
      tezosAccount: ellipsizeAddress(account),
      tezosToolkit: toolkit,
      network
    } as TezosConnected),
  connecting: () => ({ type: TezosStateType.CONNECTING } as TezosState)
};

const actionCreator = actionCreatorFactory();

type ConnectResult = {
  account: string;
  tezosToolkit: TezosToolkit;
  network: NetworkType;
};

export const connectAction = actionCreator.async<undefined,
  ConnectResult,
  string>('CONNECT');

export const disconnectAction = actionCreator('DISCONNECT');

export const
  reducer = reducerWithInitialState<TezosState>(
    TezosState.notConnected()
  )
    .case(connectAction.started, () => TezosState.connecting())
    .case(
      connectAction.done,
      (s, { result: { account, tezosToolkit, network } }) =>
        TezosState.connected(account, tezosToolkit, network)
    )
    .case(connectAction.failed, () => TezosState.notConnected())
    .case(disconnectAction, () => TezosState.notConnected())
    .default((s) => s);
