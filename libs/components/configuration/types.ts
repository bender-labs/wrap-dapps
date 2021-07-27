import { FungibleToken } from '@wrap-dapps/api';
import { NetworkType } from '@airgap/beacon-sdk';

export interface Config {
  environmentName: string;
  indexerUrl: string;
  statisticsUrl: string;
  ethereum: {
    rpcUrl: string;
    networkId: number;
    networkName: string;
    formaticApiKey: string;
    portisDAppId: string;
    custodianContractAddress: string;
  };
  tezos: {
    rpcUrl: string;
    networkId: NetworkType;
    networkName: string;
    minterContractAddress: string;
    quorumContractAddress: string;
  };
  wrapSignatureThreshold: number;
  unwrapSignatureThreshold: number;
  fungibleTokens: Record<string, FungibleToken>;
}

export interface InitialConfig {
  environmentName: string;
  indexerUrl: string;
  statisticsUrl: string;
  ethereum: {
    rpcUrl: string;
    networkId: number;
    networkName: string;
    formaticApiKey: string;
    portisDAppId: string;
  };
  tezos: {
    rpcUrl: string;
    networkId: NetworkType;
    networkName: string;
  };
}

export enum Environment {
  TESTNET = 'TESTNET',
  MAINNET = 'MAINNET',
}

export const initialConfig: InitialConfig = {
  environmentName: process.env.REACT_APP_WRAP_ENVIRONMENT!,
  indexerUrl: process.env.REACT_APP_INDEXER!,
  statisticsUrl: process.env.REACT_APP_STATISTICS!,
  ethereum: {
    rpcUrl: process.env.REACT_APP_ETH_RPC!,
    networkId: +process.env.REACT_APP_ETH_NETWORK_ID!,
    networkName: process.env.REACT_APP_ETH_NETWORK_NAME!,
    formaticApiKey: process.env.REACT_APP_FORTMATIC_API_KEY!,
    portisDAppId: process.env.REACT_APP_PORTIS_DAPP_ID!,
  },
  tezos: {
    rpcUrl: process.env.REACT_APP_TZ_RPC!,
    networkId: process.env.REACT_APP_TZ_NETWORK_ID! as NetworkType,
    networkName: process.env.REACT_APP_TZ_NETWORK_NAME!,
  },
};
