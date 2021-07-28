import { FungibleToken, NonFungibleToken } from '@wrap-dapps/api';
import { NetworkType } from '@airgap/beacon-sdk';

export interface EthereumConfig {
  rpcUrl: string;
  networkId: number;
  networkName: string;
  formaticApiKey: string;
  portisDAppId: string;
  custodianContractAddress: string;
}

export interface TezosConfig {
  rpcUrl: string;
  networkId: NetworkType;
  networkName: string;
  minterContractAddress: string;
  quorumContractAddress: string;
}

export interface Config {
  environmentName: string;
  indexerUrl: string;
  statisticsUrl: string;
  ethereum: EthereumConfig;
  tezos: TezosConfig;
  wrapSignatureThreshold: number;
  unwrapSignatureThreshold: number;
  fungibleTokens: Record<string, FungibleToken>;
  nonFungibleTokens: Record<string, NonFungibleToken>;
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