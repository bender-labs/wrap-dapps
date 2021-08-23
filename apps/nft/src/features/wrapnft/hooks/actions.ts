import actionCreatorFactory from 'typescript-fsa';
import BigNumber from 'bignumber.js';
import { TezosToolkit } from '@taquito/taquito';
import { Web3Provider } from '@ethersproject/providers';
import { NonFungibleToken } from '@wrap-dapps/api';
import { NftInstance } from '../../nft/api/types';
import { EthereumNftWrapApi } from '@wrap-dapps/features';

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

export const setContract = actionCreator<{contract: EthereumNftWrapApi}>('SET_CONTRACT');

export const runNftAllowance = actionCreator('RUN_NFT_ALLOWANCE');
export const nftApproved = actionCreator('NFT_APPROVED');

export const runNftWrap = actionCreator('RUN_NFT_WRAP');
export const nftWrapDone = actionCreator('NFT_WRAP_DONE');
export const nftNetworkFees = actionCreator<{ networkFees: BigNumber }>(
  'NFT_NETWORK_FEES'
);

export const toggleNftAgreement = actionCreator<boolean>('TOGGLE_NFT_AGREEMENT');