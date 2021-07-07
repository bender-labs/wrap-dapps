import { AnyAction } from 'typescript-fsa';
import { Dispatch } from 'react';
import { TezosToolkit, WalletProvider } from '@taquito/taquito';
import { RequestPermissionInput } from '@airgap/beacon-sdk';
import { connectAction, disconnectAction } from './state';
import { Tzip16Module } from '@taquito/tzip16';
import { NotificationLevel, Notify } from '../../notification/types';

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
  },
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
}

export const activate =
  (dispatch: Dispatch<AnyAction>, wallet: TezosWallet, notify: Notify) =>
  async (request: RequestPermissionInput) => {
    dispatch(connectAction.started(undefined));
    const library = new TezosToolkit(request.network?.rpcUrl || '');
    library.addExtension(new Tzip16Module());
    try {
      const [account, provider] = await wallet.connect(request);
      library.setWalletProvider(provider);
      library.setSignerProvider(fakeSigner(account.address, account.publicKey));
      dispatch(
        connectAction.done({
          result: {
            account: account.address,
            tezosToolkit: library,
            network: request.network!.type,
          },
        })
      );
    } catch (e) {
      notify(NotificationLevel.ERROR, 'Could not connect to your wallet');
      dispatch(connectAction.failed({ error: e.message }));
    }
  };

export const deactivate =
  (dispatch: Dispatch<AnyAction>, wallet: TezosWallet) => async () => {
    await wallet.disconnect();
    dispatch(disconnectAction());
  };
