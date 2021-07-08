import { Web3Provider } from '@ethersproject/providers';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import { ellipsizeAddress } from '../address';

export enum EthereumStateType {
  NOT_CONNECTED,
  CONNECTED,
  CONNECTING,
}

export interface NotConnected {
  type: EthereumStateType.NOT_CONNECTED;
}

export interface Connected {
  type: EthereumStateType.CONNECTED;
  network: string;
  ethereumAccount: string;
  ethereumToolkit: Web3Provider;
}

export interface Connecting {
  type: EthereumStateType.CONNECTING;
}

export type EthereumState = NotConnected | Connected | Connecting;

const actionCreator = actionCreatorFactory();

type ConnectResult = {
  account: string;
  ethereumToolkit: Web3Provider;
  network: string;
};

export const EthereumState = {
  notConnected: () =>
    ({ type: EthereumStateType.NOT_CONNECTED } as NotConnected),
  connected: (account: string, toolkit: Web3Provider, network: string) =>
    ({
      type: EthereumStateType.CONNECTED,
      ethereumAccount: ellipsizeAddress(account),
      ethereumToolkit: toolkit,
      network,
    } as Connected),
  connecting: () => ({ type: EthereumStateType.CONNECTING } as EthereumState),
};

export const connectAction = actionCreator.async<
  undefined,
  ConnectResult,
  string
>('CONNECT');

export const disconnectAction = actionCreator('DISCONNECT');

export const reducer = (state: EthereumState, action: AnyAction) => {
  return state;
};
