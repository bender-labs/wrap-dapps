import { TezosAccount, TezosWallet } from './effects';
import { RequestPermissionInput } from '@airgap/beacon-sdk';
import { WalletProvider } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';

export function beaconTezosWallet(name: string): TezosWallet {
  const wallet = new BeaconWallet({ name });

  return {
    disconnect: () => wallet.clearActiveAccount(),
    async connect(
      request: RequestPermissionInput
    ): Promise<[TezosAccount, WalletProvider]> {
      await wallet.requestPermissions(request);
      const account = await wallet.client.getActiveAccount();
      if (!account) {
        throw new Error('Beacon not initialized');
      }
      return [
        { address: account.address, publicKey: account.publicKey },
        wallet,
      ];
    },
  };
}
