import { NftUnwrapSelectorScreen } from './nft/NftUnwrapSelectorScreen';
import { NftWrapSelectorScreen } from './nft/NftWrapSelectorScreen';
import { AppRoute } from '@wrap-dapps/components';
import { Operation } from '@wrap-dapps/features';
import { NftInstance } from '../features/nft/api/types';
import { NftWrapConfirmScreen } from './nft/NftWrapConfirmScreen';
import NftWrapOperationScreen from './nft/NftWrapOperationScreen';
import { NftUnwrapConfirmScreen } from './nft/NftUnwrapConfirmScreen';
import NftUnwrapOperationScreen from './nft/NftUnwrapOperationScreen';
import HistoryNftWrapOperationsScreen from './history/HistoryNftWrapOperationsScreen';
import HistoryNftUnwrapOperationsScreen from './history/HistoryNftUnwrapOperationsScreen';
import FarmChoice from './farming/FarmChoice';
import Farm from './farming/Farm';
import OldFarm from './farming/OldFarm';
import AllFarms from './farming/AllFarms';
import { WrapScreen } from './swap/WrapScreen';
import { WrapOperationScreen } from './swap/WrapOperationScreen';
import { UnwrapScreen } from './swap/UnwrapScreen';
import { UnwrapOperationScreen } from './swap/UnwrapOperationScreen';
import HistoryWrapOperationsScreen from './history/HistoryWrapOperationsScreen';
import HistoryUnwrapOperationsScreen from './history/HistoryUnwrapOperationsScreen';
import { NftTezosTransferScreen } from './nft/NftTezosTransferScreen';
import OldAllFarms from './farming/OldAllFarms';

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

const FARMING_ROOT = '/farming';
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
  OLD_ALL_FARMS_UNSTAKE
};

export const nftWrapOperationPage = (op: Operation) => `${wrapNftPath}/${op.hash}`;
export const nftUnwrapOperationPage = (op: Operation) => `${unwrapNftPath}/${op.hash}`;
export const confirmNftWrap = (nftInstance: NftInstance) => `${confirmWrapNftPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;
export const confirmNftUnwrap = (nftInstance: NftInstance) => `${confirmUnwrapNftPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;
export const farmStakePageRoute = (farmContract: string) => FARM_STAKE.replace(':farm_address', farmContract);
export const oldFarmUnstakePageRoute = (farmContract: string) => OLD_FARM_UNSTAKE.replace(':farm_address', farmContract);
export const wrapOperationPage = (op: Operation) => `/wrap/${op.hash}`;
export const unwrapOperationPage = (op: Operation) => `/unwrap/${op.hash}`;
export const tezosTransfer = (nftInstance: NftInstance) => `${tezosTransferPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;

export const routes: AppRoute[] = [
  {
    name: 'Wrap',
    component: WrapScreen,
    path: WRAP,
    external: false,
    navRoute: true,
    activePaths: [WRAP, UNWRAP, WRAP_OPERATION, UNWRAP_OPERATION]
  }, {
    component: WrapOperationScreen,
    path: WRAP_OPERATION,
    external: false,
    navRoute: false
  }, {
    component: UnwrapScreen,
    path: UNWRAP,
    external: false,
    navRoute: false
  }, {
    component: UnwrapOperationScreen,
    path: UNWRAP_OPERATION,
    external: false,
    navRoute: false
  }, {
    name: 'NFT Wrap',
    component: NftWrapSelectorScreen,
    path: WRAP_NFT,
    external: false,
    navRoute: true,
    activePaths: [WRAP_NFT, UNWRAP_NFT, CONFIRM_NFT_UNWRAP, CONFIRM_NFT_WRAP, TEZOS_TRANSFER, NFT_WRAP_OPERATION, NFT_UNWRAP_OPERATION]
  }, {
    component: NftUnwrapSelectorScreen,
    path: UNWRAP_NFT,
    external: false,
    navRoute: false
  }, {
    component: NftWrapOperationScreen,
    path: NFT_WRAP_OPERATION,
    external: false,
    navRoute: false
  }, {
    component: NftUnwrapOperationScreen,
    path: NFT_UNWRAP_OPERATION,
    external: false,
    navRoute: false
  }, {
    component: NftWrapConfirmScreen,
    path: CONFIRM_NFT_WRAP,
    external: false,
    navRoute: false
  }, {
    component: NftUnwrapConfirmScreen,
    path: CONFIRM_NFT_UNWRAP,
    external: false,
    navRoute: false
  }, {
    name: 'History',
    component: HistoryWrapOperationsScreen,
    path: HISTORY_WRAP,
    external: false,
    navRoute: true,
    activePaths: [HISTORY_WRAP, HISTORY_UNWRAP, HISTORY_WRAP_NFT, HISTORY_UNWRAP_NFT]
  }, {
    component: HistoryUnwrapOperationsScreen,
    path: HISTORY_UNWRAP,
    external: false,
    navRoute: false
  }, {
    component: HistoryNftWrapOperationsScreen,
    path: HISTORY_WRAP_NFT,
    external: false,
    navRoute: false
  }, {
    component: HistoryNftUnwrapOperationsScreen,
    path: HISTORY_UNWRAP_NFT,
    external: false,
    navRoute: false
  }, {
    name: 'Farming',
    component: FarmChoice,
    path: FARMING_ROOT,
    external: false,
    navRoute: true,
    activePaths: [FARMING_ROOT, FARM_STAKE, FARM_CLAIM, FARM_UNSTAKE, ALL_FARMS_CLAIM, ALL_FARMS_UNSTAKE, ALL_FARMS_STAKE, OLD_FARM_CLAIM, OLD_FARM_UNSTAKE, OLD_ALL_FARMS_UNSTAKE, OLD_ALL_FARMS_CLAIM]
  }, {
    component: Farm,
    path: FARM_STAKE,
    external: false,
    navRoute: false
  }, {
    component: Farm,
    path: FARM_UNSTAKE,
    external: false,
    navRoute: false
  }, {
    component: Farm,
    path: FARM_CLAIM,
    external: false,
    navRoute: false
  }, {
    component: OldFarm,
    path: OLD_FARM_UNSTAKE,
    external: false,
    navRoute: false
  }, {
    component: OldFarm,
    path: OLD_FARM_CLAIM,
    external: false,
    navRoute: false
  }, {
    component: AllFarms,
    path: ALL_FARMS_STAKE,
    external: false,
    navRoute: false
  }, {
    component: AllFarms,
    path: ALL_FARMS_UNSTAKE,
    external: false,
    navRoute: false
  }, {
    component: AllFarms,
    path: ALL_FARMS_CLAIM,
    external: false,
    navRoute: false
  }, {
    component: NftTezosTransferScreen,
    path: TEZOS_TRANSFER,
    external: false,
    navRoute: false
  }, {
    component: OldAllFarms,
    path: OLD_ALL_FARMS_UNSTAKE,
    external: false,
    navRoute: false
  }, {
    component: OldAllFarms,
    path: OLD_ALL_FARMS_CLAIM,
    external: false,
    navRoute: false
  }];