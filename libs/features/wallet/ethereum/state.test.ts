import { connectAction, disconnectAction, EthereumState, reducer } from './state';
import { Web3Provider } from '@ethersproject/providers';
import { Mock } from 'moq.ts';

test('do nothing on unknown action', () => {
  const state = EthereumState.notConnected();
  const action = { type: 'unknown' };

  const newState = reducer(state, action);

  expect(newState).toEqual(state);
});

test('should transition to loading on connection start', () => {
  const action = connectAction.started(undefined);

  const newState = reducer(EthereumState.notConnected(), action);

  expect(newState).toEqual(EthereumState.connecting());
});

test('should transition to connected on connection success', () => {
  const provider = new Mock<Web3Provider>();

  const action = connectAction.done({
    result: {
      account: 'acc',
      ethereumToolkit: provider.object(),
      network: 'network'
    }
  });

  const newState = reducer(EthereumState.connecting(), action);

  expect(newState).toEqual(
    EthereumState.connected('acc', provider.object(), 'network')
  );
});

test('should transition to not connected on error', () => {
  const action = connectAction.failed({ error: '' });

  const newState = reducer(EthereumState.connecting(), action);

  expect(newState).toEqual(EthereumState.notConnected());
});

test('should transition to not connected on disconnect', () => {
  const provider = new Mock<Web3Provider>();
  const action = disconnectAction();

  const newState = reducer(
    EthereumState.connected('a', provider.object(), 'network'),
    action
  );

  expect(newState).toEqual(EthereumState.notConnected());
});
