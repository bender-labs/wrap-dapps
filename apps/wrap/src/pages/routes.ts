import { NftUnwrapSelectorScreen } from './wrap_nft/NftUnwrapSelectorScreen';
import { NftWrapSelectorScreen } from './wrap_nft/NftWrapSelectorScreen';
import { Operation } from '@wrap-dapps/features';
import { NftInstance } from '../features/nft/api/types';
import { NftWrapConfirmScreen } from './wrap_nft/NftWrapConfirmScreen';
import NftWrapOperationScreen from './wrap_nft/NftWrapOperationScreen';
import { NftUnwrapConfirmScreen } from './wrap_nft/NftUnwrapConfirmScreen';
import NftUnwrapOperationScreen from './wrap_nft/NftUnwrapOperationScreen';
import HistoryNftWrapOperationsScreen from './history/HistoryNftWrapOperationsScreen';
import HistoryNftUnwrapOperationsScreen from './history/HistoryNftUnwrapOperationsScreen';
import FarmChoice from './fees_farming/FarmChoice';
import Farm from './fees_farming/Farm';
import OldFarm from './fees_farming/OldFarm';
import AllFarms from './fees_farming/AllFarms';
import { WrapScreen } from './wrap/WrapScreen';
import { WrapOperationScreen } from './wrap/WrapOperationScreen';
import { UnwrapScreen } from './wrap/UnwrapScreen';
import { UnwrapOperationScreen } from './wrap/UnwrapOperationScreen';
import HistoryWrapOperationsScreen from './history/HistoryWrapOperationsScreen';
import HistoryUnwrapOperationsScreen from './history/HistoryUnwrapOperationsScreen';
import { NftTezosTransferScreen } from './wrap_nft/NftTezosTransferScreen';
import OldAllFarms from './fees_farming/OldAllFarms';
import LiquidityMiningPrograms from './liquidity_mining/LiquidityMiningPrograms';
import { LiquidityMiningProgram } from './liquidity_mining/LiquidityMiningProgram';
import React from 'react';
import { WrapStackingPool } from './wrap_stacking/WrapStackingPool';
import WrapStackingList from './wrap_stacking/WrapStackingList';


const wrapNftPath = '/wrap-nft';
const unwrapNftPath = '/unwrap-nft';
const confirmWrapNftPath = '/confirm-wrap-nft';
const confirmUnwrapNftPath = '/confirm-unwrap-nft';
const tezosTransferPath = '/transfer';

const WRAP_NFT = wrapNftPath;
const UNWRAP_NFT = unwrapNftPath;
const CONFIRM_NFT_WRAP = confirmWrapNftPath + '/:nftCollectionAddress/:tokenId';
const CONFIRM_NFT_UNWRAP = confirmUnwrapNftPath + '/:nftCollectionAddress/:tokenId';
const NFT_WRAP_OPERATION = wrapNftPath + '/:transactionHash';
const NFT_UNWRAP_OPERATION = unwrapNftPath + '/:transactionHash';

const HISTORY_WRAP = '/history/wrap';
const HISTORY_UNWRAP = '/history/unwrap';
const HISTORY_WRAP_NFT = '/history/wrap/nft';
const HISTORY_UNWRAP_NFT = '/history/unwrap/nft';

export const FARMING_ROOT = '/fees-farming';
const FARM_PARAMETER = '/farm/:farm_address';
const FARM_STAKE = `${FARMING_ROOT}${FARM_PARAMETER}/stake`;
const FARM_UNSTAKE = `${FARMING_ROOT}${FARM_PARAMETER}/unstake`;
const FARM_CLAIM = `${FARMING_ROOT}${FARM_PARAMETER}/claim`;
const ALL_FARMS_STAKE = `${FARMING_ROOT}/all_farms/stake`;
const ALL_FARMS_UNSTAKE = `${FARMING_ROOT}/all_farms/unstake`;
const ALL_FARMS_CLAIM = `${FARMING_ROOT}/all_farms/claim`;
const OLD_FARM_UNSTAKE = `${FARMING_ROOT}/old-farm/:farm_address/unstake`;
const OLD_FARM_CLAIM = `${FARMING_ROOT}/old-farm/:farm_address/claim`;
const OLD_ALL_FARMS_UNSTAKE = `${FARMING_ROOT}/all_farms/old/unstake`;
const OLD_ALL_FARMS_CLAIM = `${FARMING_ROOT}/all_farms/old/claim`;

const WRAP = '/wrap';
const UNWRAP = '/unwrap';
const WRAP_OPERATION = '/wrap/:transactionHash';
const UNWRAP_OPERATION = '/unwrap/:transactionHash';

const TEZOS_TRANSFER = tezosTransferPath + '/:nftCollectionAddress/:tokenId';

const WRAP_STACKING_ROOT = '/wrap-stacking';
const WRAP_STACKING_STAKE = WRAP_STACKING_ROOT + '/stake';
const WRAP_STACKING_UNSTAKE = WRAP_STACKING_ROOT + '/unstake';
const WRAP_STACKING_CLAIM = WRAP_STACKING_ROOT + '/claim';

const LIQUIDITY_MINING_ROOT = '/liquidity-mining';
const LIQUIDITY_MINING_STAKE = `${LIQUIDITY_MINING_ROOT}/op/:token/stake`;
const LIQUIDITY_MINING_UNSTAKE = `${LIQUIDITY_MINING_ROOT}/op/:token/unstake`;
const LIQUIDITY_MINING_CLAIM = `${LIQUIDITY_MINING_ROOT}/op/:token/claim`;

export const paths = {
  CONFIRM_NFT_WRAP,
  NFT_WRAP_OPERATION,
  WRAP_NFT,
  UNWRAP_NFT,
  HISTORY_WRAP,
  HISTORY_UNWRAP,
  HISTORY_WRAP_NFT,
  HISTORY_UNWRAP_NFT,
  FARMING_ROOT,
  FARM_PARAMETER,
  FARM_STAKE,
  FARM_UNSTAKE,
  FARM_CLAIM,
  OLD_FARM_UNSTAKE,
  OLD_FARM_CLAIM,
  ALL_FARMS_STAKE,
  ALL_FARMS_UNSTAKE,
  ALL_FARMS_CLAIM,
  WRAP,
  WRAP_OPERATION,
  UNWRAP_OPERATION,
  UNWRAP,
  TEZOS_TRANSFER,
  OLD_ALL_FARMS_CLAIM,
  OLD_ALL_FARMS_UNSTAKE,
  WRAP_STACKING: WRAP_STACKING_ROOT,
  LIQUIDITY_MINING_ROOT,
  LIQUIDITY_MINING_STAKE,
  LIQUIDITY_MINING_UNSTAKE,
  LIQUIDITY_MINING_CLAIM,
  WRAP_STACKING_STAKE,
  WRAP_STACKING_UNSTAKE,
  WRAP_STACKING_CLAIM
};

export const nftWrapOperationPage = (op: Operation) => `${wrapNftPath}/${op.hash}`;
export const nftUnwrapOperationPage = (op: Operation) => `${unwrapNftPath}/${op.hash}`;
export const confirmNftWrap = (nftInstance: NftInstance) => `${confirmWrapNftPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;
export const confirmNftUnwrap = (nftInstance: NftInstance) => `${confirmUnwrapNftPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;
export const farmStakePageRoute = (farmContract: string) => FARM_STAKE.replace(':farm_address', farmContract);
export const wrapOperationPage = (op: Operation) => `/wrap/${op.hash}`;
export const unwrapOperationPage = (op: Operation) => `/unwrap/${op.hash}`;
export const tezosTransfer = (nftInstance: NftInstance) => `${tezosTransferPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;
export const liquidityMiningOperationPage = (v: string) => LIQUIDITY_MINING_STAKE.replace(':token', v);
export const oldLiquidityMiningOperationPage = (v: string) => LIQUIDITY_MINING_UNSTAKE.replace(':token', v);

export type AppRoute = {
  name?: string;
  component: React.ComponentType<any>;
  path: string;
  navRoute?: number;
  activePaths?: string[];
}

export const routes: AppRoute[] = [
  {
    name: 'Wrap',
    component: WrapScreen,
    path: WRAP,
    navRoute: 1,
    activePaths: [WRAP, UNWRAP, WRAP_OPERATION, UNWRAP_OPERATION, WRAP_NFT, UNWRAP_NFT, CONFIRM_NFT_UNWRAP, CONFIRM_NFT_WRAP, TEZOS_TRANSFER, NFT_WRAP_OPERATION, NFT_UNWRAP_OPERATION, HISTORY_WRAP, HISTORY_UNWRAP, HISTORY_WRAP_NFT, HISTORY_UNWRAP_NFT]
  }, {
    name: 'Tokens',
    component: WrapScreen,
    path: WRAP,
    navRoute: 2,
    activePaths: [WRAP, UNWRAP, WRAP_OPERATION, UNWRAP_OPERATION]
  }, {
    component: WrapOperationScreen,
    path: WRAP_OPERATION
  }, {
    component: UnwrapScreen,
    path: UNWRAP
  }, {
    component: UnwrapOperationScreen,
    path: UNWRAP_OPERATION
  }, {
    name: 'NFTs',
    component: NftWrapSelectorScreen,
    path: WRAP_NFT,
    navRoute: 2,
    activePaths: [WRAP_NFT, UNWRAP_NFT, CONFIRM_NFT_UNWRAP, CONFIRM_NFT_WRAP, TEZOS_TRANSFER, NFT_WRAP_OPERATION, NFT_UNWRAP_OPERATION]
  }, {
    component: NftUnwrapSelectorScreen,
    path: UNWRAP_NFT
  }, {
    component: NftWrapOperationScreen,
    path: NFT_WRAP_OPERATION
  }, {
    component: NftUnwrapOperationScreen,
    path: NFT_UNWRAP_OPERATION
  }, {
    component: NftWrapConfirmScreen,
    path: CONFIRM_NFT_WRAP
  }, {
    component: NftUnwrapConfirmScreen,
    path: CONFIRM_NFT_UNWRAP
  }, {
    component: NftTezosTransferScreen,
    path: TEZOS_TRANSFER
  }, {
    name: 'My history',
    component: HistoryWrapOperationsScreen,
    path: HISTORY_WRAP,
    navRoute: 2,
    activePaths: [HISTORY_WRAP, HISTORY_UNWRAP, HISTORY_WRAP_NFT, HISTORY_UNWRAP_NFT]
  }, {
    component: HistoryUnwrapOperationsScreen,
    path: HISTORY_UNWRAP
  }, {
    component: HistoryNftWrapOperationsScreen,
    path: HISTORY_WRAP_NFT
  }, {
    component: HistoryNftUnwrapOperationsScreen,
    path: HISTORY_UNWRAP_NFT
  }, {
    name: 'Farming',
    component: FarmChoice,
    path: FARMING_ROOT,
    navRoute: 1,
    activePaths: [FARMING_ROOT, FARM_STAKE, FARM_CLAIM, FARM_UNSTAKE, ALL_FARMS_CLAIM, ALL_FARMS_UNSTAKE, ALL_FARMS_STAKE, OLD_FARM_CLAIM, OLD_FARM_UNSTAKE, OLD_ALL_FARMS_UNSTAKE, OLD_ALL_FARMS_CLAIM, LIQUIDITY_MINING_ROOT, LIQUIDITY_MINING_STAKE, LIQUIDITY_MINING_UNSTAKE, LIQUIDITY_MINING_CLAIM]
  }, {
    name: 'Fees Farming',
    component: FarmChoice,
    path: FARMING_ROOT,
    navRoute: 2,
    activePaths: [FARMING_ROOT, FARM_STAKE, FARM_CLAIM, FARM_UNSTAKE, ALL_FARMS_CLAIM, ALL_FARMS_UNSTAKE, ALL_FARMS_STAKE, OLD_FARM_CLAIM, OLD_FARM_UNSTAKE, OLD_ALL_FARMS_UNSTAKE, OLD_ALL_FARMS_CLAIM]
  }, {
    component: Farm,
    path: FARM_STAKE
  }, {
    component: Farm,
    path: FARM_UNSTAKE
  }, {
    component: Farm,
    path: FARM_CLAIM
  }, {
    component: OldFarm,
    path: OLD_FARM_UNSTAKE
  }, {
    component: OldFarm,
    path: OLD_FARM_CLAIM
  }, {
    component: AllFarms,
    path: ALL_FARMS_STAKE
  }, {
    component: AllFarms,
    path: ALL_FARMS_UNSTAKE
  }, {
    component: AllFarms,
    path: ALL_FARMS_CLAIM
  }, {
    component: OldAllFarms,
    path: OLD_ALL_FARMS_UNSTAKE
  }, {
    component: OldAllFarms,
    path: OLD_ALL_FARMS_CLAIM
  }, {
    name: 'Liquidity mining',
    component: LiquidityMiningPrograms,
    path: LIQUIDITY_MINING_ROOT,
    navRoute: 2,
    activePaths: [LIQUIDITY_MINING_ROOT, LIQUIDITY_MINING_STAKE, LIQUIDITY_MINING_UNSTAKE, LIQUIDITY_MINING_CLAIM]
  }, {
    component: LiquidityMiningProgram,
    path: LIQUIDITY_MINING_STAKE
  }, {
    component: LiquidityMiningProgram,
    path: LIQUIDITY_MINING_UNSTAKE
  }, {
    component: LiquidityMiningProgram,
    path: LIQUIDITY_MINING_CLAIM
  }, {
    name: '$WRAP Stacking',
    component: WrapStackingList,
    path: WRAP_STACKING_ROOT,
    navRoute: 2,
    activePaths: [WRAP_STACKING_ROOT, WRAP_STACKING_STAKE, WRAP_STACKING_UNSTAKE, WRAP_STACKING_CLAIM]
  }, {
    component: WrapStackingPool,
    path: WRAP_STACKING_STAKE
  }, {
    component: WrapStackingPool,
    path: WRAP_STACKING_UNSTAKE
  }, {
    component: WrapStackingPool,
    path: WRAP_STACKING_CLAIM
  }];