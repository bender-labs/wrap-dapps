import { Web3Provider } from '@ethersproject/providers';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export enum EthereumStateType {
  NOT_CONNECTED,
  CONNECTED,
  CONNECTING,
}

export interface EthereumNotConnected {
  type: EthereumStateType.NOT_CONNECTED;
}

export interface EthereumConnected {
  type: EthereumStateType.CONNECTED;
  network: string;
  ethereumAccount: string;
  ethereumToolkit: Web3Provider;
}

export interface EthereumConnecting {
  type: EthereumStateType.CONNECTING;
}

export type EthereumState = EthereumNotConnected | EthereumConnected | EthereumConnecting;

const actionCreator = actionCreatorFactory();

type ConnectResult = {
  account: string;
  ethereumToolkit: Web3Provider;
  network: string;
};

export const EthereumState = {
  notConnected: () =>
    ({ type: EthereumStateType.NOT_CONNECTED } as EthereumNotConnected),
  connected: (account: string, toolkit: Web3Provider, network: string) =>
    ({
      type: EthereumStateType.CONNECTED,
      ethereumAccount: account,
      ethereumToolkit: toolkit,
      network
    } as EthereumConnected),
  connecting: () => ({ type: EthereumStateType.CONNECTING } as EthereumState)
};

export const connectAction = actionCreator.async<undefined,
  ConnectResult,
  string>('CONNECT');

export const disconnectAction = actionCreator('DISCONNECT');

export const reducer = reducerWithInitialState<EthereumState>(
  EthereumState.notConnected()
)
  .case(connectAction.started, () => EthereumState.connecting())
  .case(
    connectAction.done,
    (s, { result: { account, ethereumToolkit, network } }) =>
      EthereumState.connected(account, ethereumToolkit, network)
  )
  .case(connectAction.failed, () => EthereumState.notConnected())
  .case(disconnectAction, () => EthereumState.notConnected())
  .default((s) => s);
