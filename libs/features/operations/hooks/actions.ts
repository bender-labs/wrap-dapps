import actionCreatorFactory from 'typescript-fsa';
import { Operation, OperationType } from '../state';
import { Web3Provider } from '@ethersproject/providers';
import { TezosToolkit } from '@taquito/taquito';
import { Fees, IndexerUnwrapPayload, IndexerWrapPayload } from '@wrap-dapps/api';
import { TransactionReceipt } from '@ethersproject/abstract-provider';

const actionCreator = actionCreatorFactory();

export const fetchReceipt = actionCreator<{
  hash: string;
  type: OperationType;
  ethLibrary?: Web3Provider;
  tzLibrary?: TezosToolkit;
}>('FETCH_RECEIPT');

export const reload = actionCreator<{
  hash: string;
  type: OperationType;
  fees: Fees;
  signaturesThreshold: number;
}>('RELOAD');

export const update = actionCreator<{ operation: Operation }>('UPDATE');

export const updateWrap = actionCreator<{
  data: IndexerWrapPayload;
  fees: Fees;
  signaturesThreshold: number;
}>('UPDATE_WRAP');

export const updateNftWrap = actionCreator<{
  data: IndexerWrapPayload;
  fees: Fees;
  signaturesThreshold: number;
}>('UPDATE_NFT_WRAP');

export const updateUnwrap = actionCreator<{
  data: IndexerUnwrapPayload;
  fees: Fees;
  signaturesThreshold: number;
}>('UPDATE_UNWRAP');

export const updateNftUnwrap = actionCreator<{
  data: IndexerUnwrapPayload;
  fees: Fees;
  signaturesThreshold: number;
}>('UPDATE_NFT_UNWRAP');

export const receiptFetched = actionCreator<{ receipt?: TransactionReceipt }>(
  'RECEIPT_FETCHED'
);

export const beginApply = actionCreator('BEGIN_APPLY');

export const mint = actionCreator<{
  tzLibrary: TezosToolkit;
  quorumContractAddress: string;
  minterContractAddress: string;
}>('MINT');

export const mintNFT = actionCreator<{
  tzLibrary: TezosToolkit;
  quorumContractAddress: string;
  minterContractAddress: string;
}>('MINT_NFT');

export const release = actionCreator<{
  ethLibrary: Web3Provider;
  custodianContractAddress: string;
}>('RELEASE');

export const releaseNFT = actionCreator<{
  ethLibrary: Web3Provider;
  custodianContractAddress: string;
}>('RELEASE_NFT');
