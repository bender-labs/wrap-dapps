import { TezosToolkit } from '@taquito/taquito';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { NetworkType } from '@airgap/beacon-sdk';

export enum TezosStateType {
  NOT_CONNECTED,
  CONNECTED,
  CONNECTING,
}

export interface NotConnected {
  type: TezosStateType.NOT_CONNECTED;
}

export interface Connected {
  type: TezosStateType.CONNECTED;
  network: NetworkType;
  tezosAccount: string;
  tezosToolkit: TezosToolkit;
}

export interface Connecting {
  type: TezosStateType.CONNECTING;
}

export type TezosState = NotConnected | Connected | Connecting;

export const TezosState = {
  notConnected: () => ({ type: TezosStateType.NOT_CONNECTED } as NotConnected),
  connected: (account: string, toolkit: TezosToolkit, network: NetworkType) =>
    ({
      type: TezosStateType.CONNECTED,
      tezosAccount: account,
      tezosToolkit: toolkit,
      network,
    } as Connected),
  connecting: () => ({ type: TezosStateType.CONNECTING } as TezosState),
};

const actionCreator = actionCreatorFactory();

type ConnectResult = {
  account: string;
  tezosToolkit: TezosToolkit;
  network: NetworkType;
};

export const connectAction = actionCreator.async<undefined, ConnectResult>(
  'CONNECT'
);

export const disconnectAction = actionCreator('DISCONNECT');

export const reducer = reducerWithInitialState<TezosState>(
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
