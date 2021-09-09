import { NftUnwrapSelectorScreen } from './nft/NftUnwrapSelectorScreen';
import { NftWrapSelectorScreen } from './nft/NftWrapSelectorScreen';
import { AppRoute } from '@wrap-dapps/components';
import { Operation } from '@wrap-dapps/features';
import { NftInstance } from '../features/nft/api/types';
import { NftWrapConfirmScreen } from './nft/NftWrapConfirmScreen';
import NftWrapOperationScreen from './nft/NftWrapOperationScreen';
import { NftUnwrapConfirmScreen } from './nft/NftUnwrapConfirmScreen';
import NftUnwrapOperationScreen from './nft/NftUnwrapOperationScreen';
import HistoryWrapOperationsScreen from './HistoryWrapOperationsScreen';
import HistoryUnwrapOperationsScreen from './HistoryUnwrapOperationsScreen';
import FarmChoice from './farming/FarmChoice';
import Farm from './farming/Farm';
import OldFarm from './farming/OldFarm';
import AllFarms from './farming/AllFarms';
import { WrapScreen } from './swap/WrapScreen';
import { WrapOperationScreen } from './swap/WrapOperationScreen';
import { UnwrapScreen } from './swap/UnwrapScreen';
import { UnwrapOperationScreen } from './swap/UnwrapOperationScreen';

const confirmWrapNftPath = '/confirm-wrap-nft';
const confirmUnwrapNftPath = '/confirm-unwrap-nft';
const wrapNftOperationPath = '/wrap-nft';
const unwrapNftOperationPath = '/unwrap-nft';

const CONFIRM_NFT_WRAP = confirmWrapNftPath + '/:nftCollectionAddress/:tokenId';
const NFT_WRAP_OPERATION = wrapNftOperationPath + '/:transactionHash';
const CONFIRM_NFT_UNWRAP = confirmUnwrapNftPath + '/:nftCollectionAddress/:tokenId';
const NFT_UNWRAP_OPERATION = unwrapNftOperationPath + '/:transactionHash';

const ETHEREUM_DASHBOARD = '/ethereum';
const TEZOS_DASHBOARD = '/tezos';

const HISTORY_WRAP = '/history/wrap';
const HISTORY_UNWRAP = '/history/unwrap';

const FARMING_ROOT = '/farming';
const FARM_PARAMETER = '/farm/:farm_address';
const FARM_STAKE = `${FARMING_ROOT}${FARM_PARAMETER}/stake`;
const FARM_UNSTAKE = `${FARMING_ROOT}${FARM_PARAMETER}/unstake`;
const FARM_CLAIM = `${FARMING_ROOT}${FARM_PARAMETER}/claim`;
const OLD_FARM_UNSTAKE = `${FARMING_ROOT}/old-farm/:farm_address/unstake`;
const ALL_FARMS_STAKE = `${FARMING_ROOT}/all_farms/stake`;
const ALL_FARMS_UNSTAKE = `${FARMING_ROOT}/all_farms/unstake`;
const ALL_FARMS_CLAIM = `${FARMING_ROOT}/all_farms/claim`;

const WRAP = '/wrap';
const WRAP_FINALIZE = '/wrap/:transactionHash';
const UNWRAP_FINALIZE = '/unwrap/:transactionHash';
const UNWRAP = '/unwrap';

export const paths = {
  CONFIRM_NFT_WRAP,
  NFT_WRAP_OPERATION,
  ETHEREUM_DASHBOARD,
  TEZOS_DASHBOARD,
  HISTORY_WRAP,
  HISTORY_UNWRAP,
  FARMING_ROOT,
  FARM_PARAMETER,
  FARM_STAKE,
  FARM_UNSTAKE,
  FARM_CLAIM,
  OLD_FARM_UNSTAKE,
  ALL_FARMS_STAKE,
  ALL_FARMS_UNSTAKE,
  ALL_FARMS_CLAIM,
  WRAP,
  WRAP_FINALIZE,
  UNWRAP_FINALIZE,
  UNWRAP
};

export const nftWrapOperationPage = (op: Operation) => `${wrapNftOperationPath}/${op.hash}`;
export const nftUnwrapOperationPage = (op: Operation) => `${unwrapNftOperationPath}/${op.hash}`;
export const confirmNftWrap = (nftInstance: NftInstance) => `${confirmWrapNftPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;
export const confirmNftUnwrap = (nftInstance: NftInstance) => `${confirmUnwrapNftPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;
export const farmStakePageRoute = (farmContract: string) =>
  FARM_STAKE.replace(':farm_address', farmContract);
export const oldFarmUnstakePageRoute = (farmContract: string) =>
  OLD_FARM_UNSTAKE.replace(':farm_address', farmContract);
export const wrapPage = (op: Operation) => `/wrap/${op.hash}`;
export const unwrapPage = (op: Operation) => `/unwrap/${op.hash}`;

export const routes: AppRoute[] = [
  {
    name: 'Wrap',
    component: WrapScreen,
    path: WRAP,
    external: false,
    navRoute: true
  }, {
    component: WrapOperationScreen,
    path: WRAP_FINALIZE,
    external: false,
    navRoute: false
  }, {
    component: UnwrapScreen,
    path: UNWRAP,
    external: false,
    navRoute: false
  }, {
    component: UnwrapOperationScreen,
    path: UNWRAP_FINALIZE,
    external: false,
    navRoute: false
  }, {
    name: 'NFT Wrap',
    component: NftWrapSelectorScreen,
    path: ETHEREUM_DASHBOARD,
    external: false,
    navRoute: true
  }, {
    component: NftUnwrapSelectorScreen,
    path: TEZOS_DASHBOARD,
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
    navRoute: true
  }, {
    component: HistoryUnwrapOperationsScreen,
    path: HISTORY_UNWRAP,
    external: false,
    navRoute: false
  }, {
    name: 'Farming',
    component: FarmChoice,
    path: FARMING_ROOT,
    external: false,
    navRoute: true
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
  }];