import { EthereumAccount, EthereumWallet } from './effects';
import { EthConnector } from './connectorsFactory';
import { Web3Provider } from '@ethersproject/providers';

export function web3Wallet() {
  const wallet: EthereumWallet = {
    connect(request: EthConnector): Promise<[EthereumAccount, Web3Provider]> {
      return Promise.resolve([undefined, undefined]);
    }, disconnect(): Promise<void> {
      return Promise.resolve(undefined);
    }, initialize(): Promise<[EthereumAccount, Web3Provider] | undefined> {
      return Promise.resolve(undefined);
    }
  };
  return wallet;
}