import { AnyAction } from 'typescript-fsa';
import { Dispatch } from 'react';
import { TezosToolkit, WalletProvider } from '@taquito/taquito';
import { RpcClient, RpcClientCache } from '@taquito/rpc';
import { RequestPermissionInput } from '@airgap/beacon-sdk';
import { connectAction, disconnectAction } from './state';
import { Tzip16Module } from '@taquito/tzip16';
import { NotificationLevel, Notify } from '@wrap-dapps/components/notification/types';

// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols,ES6ShorthandObjectProperty
const fakeSigner = (account: string, publicKey: string) => ({
  publicKey(): Promise<string> {
    return Promise.resolve(publicKey);
  },
  publicKeyHash(): Promise<string> {
    return Promise.resolve(account);
  },
  secretKey(): Promise<string | undefined> {
    return Promise.reject('Noop signer');
  },
  sign(
    op: {},
    magicByte: Uint8Array | undefined
  ): Promise<{
    bytes: string;
    sig: string;
    prefixSig: string;
    sbytes: string;
  }> {
    return Promise.reject('Noop signer');
  }
});

export interface TezosAccount {
  address: string;
  publicKey: string;
}

export interface TezosWallet {
  connect: (
    request: RequestPermissionInput
  ) => Promise<[TezosAccount, WalletProvider]>;
  disconnect: () => Promise<void>;
  initialize: () => Promise<[TezosAccount, WalletProvider] | undefined>;
}

const toolkit = (
  rpcUrl: string,
  provider: WalletProvider,
  account: TezosAccount
) => {
  const rpcClient = new RpcClient(rpcUrl);
  const result = new TezosToolkit(new RpcClientCache(rpcClient, 10000));
  result.setWalletProvider(provider);
  result.addExtension(new Tzip16Module());
  result.setSignerProvider(fakeSigner(account.address, account.publicKey));
  return result;
};

export const initialize =
  (dispatch: Dispatch<AnyAction>, wallet: TezosWallet, notify: Notify) =>
    async (request: RequestPermissionInput) => {
      const existingAccount = await wallet.initialize();
      if (existingAccount) {
        const [account, provider] = existingAccount;
        const library = toolkit(request.network?.rpcUrl || '', provider, account);
        connectAndNotify(dispatch, notify, account, library, request);
      }
    };

export const activate =
  (dispatch: Dispatch<AnyAction>, wallet: TezosWallet, notify: Notify) =>
    async (request: RequestPermissionInput) => {
      dispatch(connectAction.started(undefined));

      try {
        const [account, provider] = await wallet.connect(request);
        const library = toolkit(request.network?.rpcUrl || '', provider, account);
        connectAndNotify(dispatch, notify, account, library, request);
      } catch (e) {
        dispatch(connectAction.failed({ error: e.message }));
        notify(NotificationLevel.ERROR, 'Could not connect to your Tezos wallet');
      }
    };

const connectAndNotify = (dispatch: Dispatch<AnyAction>, notify: Notify, account: TezosAccount, library: TezosToolkit, request: RequestPermissionInput) => {
  dispatch(
    connectAction.done({
      result: {
        account: account.address,
        tezosToolkit: library,
        network: request.network!.type
      }
    })
  );
  notify(NotificationLevel.SUCCESS, 'Connected to your Tezos wallet');
};

export const deactivate =
  (dispatch: Dispatch<AnyAction>, wallet: TezosWallet, notify: Notify) => async () => {
    await wallet.disconnect();
    dispatch(disconnectAction());
    notify(NotificationLevel.SUCCESS, 'Disconnected from your Tezos wallet');
  };
