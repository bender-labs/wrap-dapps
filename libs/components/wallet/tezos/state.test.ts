import { connectAction, disconnectAction, reducer, TezosState } from './state';
import { TezosToolkit } from '@taquito/taquito';
import { NetworkType } from '@airgap/beacon-sdk';

test('do nothing on unknown action', () => {
  const state = TezosState.notConnected();
  const action = { type: 'unknown' };

  const newState = reducer(state, action);

  expect(newState).toEqual(state);
});

test('should transition to loading on connection start', () => {
  const action = connectAction.started(undefined);

  const newState = reducer(TezosState.notConnected(), action);

  expect(newState).toEqual(TezosState.connecting());
});

test('should transition to connected on connection success', () => {
  let toolkit = new TezosToolkit('');
  const action = connectAction.done({
    result: {
      account: 'acc',
      tezosToolkit: toolkit,
      network: NetworkType.MAINNET,
    },
  });

  const newState = reducer(TezosState.connecting(), action);

  expect(newState).toEqual(
    TezosState.connected('acc', toolkit, NetworkType.MAINNET)
  );
});

test('should transition to not connected on error', () => {
  const action = connectAction.failed({ error: '' });

  const newState = reducer(TezosState.connecting(), action);

  expect(newState).toEqual(TezosState.notConnected());
});

test('should transition to not connected on disconnect', () => {
  const action = disconnectAction();

  const newState = reducer(
    TezosState.connected('a', new TezosToolkit(''), NetworkType.MAINNET),
    action
  );

  expect(newState).toEqual(TezosState.notConnected());
});
