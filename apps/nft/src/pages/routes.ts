import { NftUnwrapSelectorScreen, NftWrapSelectorScreen } from './index';
import { AppRoute } from '@wrap-dapps/components';
import { Operation } from '@wrap-dapps/features';
import { NftInstance } from '../features/nft/api/types';
import { NftWrapConfirmScreen } from './NftWrapConfirmScreen';
import NftWrapOperationScreen from './NftWrapOperationScreen';
import { NftUnwrapConfirmScreen } from './NftUnwrapConfirmScreen';
import NftUnwrapOperationScreen from './NftUnwrapOperationScreen';
import HistoryWrapOperationsScreen from './HistoryWrapOperationsScreen';
import HistoryUnwrapOperationsScreen from './HistoryUnwrapOperationsScreen';

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

export const paths = {
  CONFIRM_NFT_WRAP,
  NFT_WRAP_OPERATION,
  ETHEREUM_DASHBOARD,
  TEZOS_DASHBOARD,
  HISTORY_WRAP,
  HISTORY_UNWRAP
};

export const nftWrapOperationPage = (op: Operation) => `${wrapNftOperationPath}/${op.hash}`;
export const nftUnwrapOperationPage = (op: Operation) => `${unwrapNftOperationPath}/${op.hash}`;
export const confirmNftWrap = (nftInstance: NftInstance) => `${confirmWrapNftPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;
export const confirmNftUnwrap = (nftInstance: NftInstance) => `${confirmUnwrapNftPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;

export const routes: AppRoute[] = [{
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
}];