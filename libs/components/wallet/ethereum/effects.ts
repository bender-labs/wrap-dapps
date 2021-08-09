import { Web3Provider } from '@ethersproject/providers';
import { EthConnector } from './connectorsFactory';

// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols,ES6ShorthandObjectProperty

export interface EthereumAccount {
  address: string;
  publicKey: string;
}

export interface EthereumWallet {
  connect: (
    request: EthConnector
  ) => Promise<[EthereumAccount, Web3Provider]>;
  disconnect: () => Promise<void>;
  initialize: () => Promise<[EthereumAccount, Web3Provider] | undefined>;
}