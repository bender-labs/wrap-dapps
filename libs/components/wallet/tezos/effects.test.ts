import { activate, TezosWallet } from './effects';
import {
  TezosToolkit,
  WalletDelegateParams,
  WalletOriginateParams,
  WalletTransferParams,
} from '@taquito/taquito';
import { connectAction } from './state';
import { NetworkType } from '@airgap/beacon-sdk';

function aTezosWallet(account: string, publicKey: string): TezosWallet {
  return {
    authorise: jest.fn(() => Promise.resolve({ address: account, publicKey })),
    getPKH(): Promise<string> {
      return Promise.resolve('');
    },
    mapDelegateParamsToWalletParams(
      params: WalletDelegateParams
    ): Promise<any> {
      return Promise.resolve(undefined);
    },
    mapOriginateParamsToWalletParams(
      params: WalletOriginateParams
    ): Promise<any> {
      return Promise.resolve(undefined);
    },
    mapTransferParamsToWalletParams(
      params: WalletTransferParams
    ): Promise<any> {
      return Promise.resolve(undefined);
    },
    sendOperations(params: any[]): Promise<string> {
      return Promise.resolve('');
    },
  };
}

test('should dispatch connection is starting', async () => {
  const dispatch = jest.fn();
  const wallet = aTezosWallet('nop', "don't care");
  const doActivate = activate(dispatch, wallet);

  await doActivate({
    network: { type: NetworkType.GRANADANET, rpcUrl: '' },
    scopes: [],
  });

  expect(dispatch).toBeCalledTimes(2);
  expect(dispatch).toBeCalledWith(connectAction.started(undefined));
});

test('should dispatch tezos account if everything goes well', async () => {
  const dispatch = jest.fn();
  const wallet = aTezosWallet('wonderful account', 'publicKey');
  const doActivate = activate(dispatch, wallet);
  const request = {
    network: { type: NetworkType.GRANADANET, rpcUrl: 'zeUrl' },
    scopes: [],
  };

  await doActivate(request);

  expect(dispatch).toBeCalledTimes(2);
  expect(dispatch).toBeCalledWith(
    connectAction.done({
      result: {
        account: 'wonderful account',
        tezosToolkit: expect.any(TezosToolkit),
        network: NetworkType.GRANADANET,
      },
    })
  );
  expect(wallet.authorise).toHaveBeenCalledWith(request);
  const action = dispatch.mock.calls[1][0];
  const {
    result: { tezosToolkit },
  } = action.payload;
  expect(tezosToolkit._rpc).toEqual('zeUrl');
});
