import actionCreatorFactory from 'typescript-fsa';
import BigNumber from 'bignumber.js';
import { TezosToolkit } from '@taquito/taquito';
import { Web3Provider } from '@ethersproject/providers';
import { NonFungibleToken } from '@wrap-dapps/api';
import { NftInstance } from '../../nft/api/types';
import { TezosNftUnwrapApi } from '@wrap-dapps/features';

const actionCreator = actionCreatorFactory();

export const selectNft = actionCreator<{
  nftCollection: NonFungibleToken | null;
  nftInstance: NftInstance | null;
}>('SELECT_NFT');

export const walletChange = actionCreator<{
  tezosAccount?: string;
  tezosLibrary?: TezosToolkit;
  ethAccount?: string;
  ethLibrary?: Web3Provider;
}>('WALLET_CHANGE');

export const setContract = actionCreator<{ contract: TezosNftUnwrapApi }>('SET_CONTRACT');

export const runNftUnwrap = actionCreator('RUN_NFT_UNWRAP');
export const nftUnwrapDone = actionCreator('NFT_UNWRAP_DONE');
export const nftNetworkFees = actionCreator<{ networkFees: BigNumber }>(
  'NFT_NETWORK_FEES'
);

export const toggleNftAgreement = actionCreator<boolean>('TOGGLE_NFT_AGREEMENT');