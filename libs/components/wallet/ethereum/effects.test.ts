import { EthereumWallet } from './effects';
import { Provider } from '@ethersproject/providers';

function aEthereumWallet(account: string, publicKey: string): EthereumWallet {
  const provider: Provider = {
    getPKH(): Promise<string> {
      return Promise.resolve('');
    },
    mapDelegateParamsToWalletParams(): Promise<any> {
      return Promise.resolve(undefined);
    },
    mapOriginateParamsToWalletParams(): Promise<any> {
      return Promise.resolve(undefined);
    },
    mapTransferParamsToWalletParams(): Promise<any> {
      return Promise.resolve(undefined);
    },
    sendOperations(): Promise<string> {
      return Promise.resolve('');
    },
  };

  return {
    connect: jest.fn(() =>
      Promise.resolve([{ address: account, publicKey }, provider])
    ),
    disconnect: jest.fn(),
    initialise: () =>
      Promise.resolve([{ address: account, publicKey }, provider]),
  };
}

const dispatch = jest.fn();