import { NftUnwrapSelectorScreen, NftWrapSelectorScreen } from './index';
import { AppRoute } from '@wrap-dapps/components';
import { Operation } from '@wrap-dapps/features';
import { NftInstance } from '../features/nft/api/types';
import { NftWrapConfirmScreen } from './NftWrapConfirmScreen';
import NftWrapOperationScreen from './NftWrapOperationScreen';
import { NftUnwrapConfirmScreen } from './NftUnwrapConfirmScreen';
import NftUnwrapOperationScreen from './NftUnwrapOperationScreen';

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

export const paths = {
  CONFIRM_NFT_WRAP,
  NFT_WRAP_OPERATION,
  ETHEREUM_DASHBOARD,
  TEZOS_DASHBOARD
};

export const nftWrapOperationPage = (op: Operation) => `${wrapNftOperationPath}/${op.hash}`;
export const nftUnwrapOperationPage = (op: Operation) => `${unwrapNftOperationPath}/${op.hash}`;
export const confirmNftWrap = (nftInstance: NftInstance) => `${confirmWrapNftPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;
export const confirmNftUnwrap = (nftInstance: NftInstance) => `${confirmUnwrapNftPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;

export const routes: AppRoute[] = [{
  name: 'Ethereum NFTs',
  component: NftWrapSelectorScreen,
  path: ETHEREUM_DASHBOARD,
  external: false,
  navRoute: true
}, {
  name: 'Tezos NFTs',
  component: NftUnwrapSelectorScreen,
  path: TEZOS_DASHBOARD,
  external: false,
  navRoute: true
}, {
  name: 'Nft wrap operation page',
  component: NftWrapOperationScreen,
  path: NFT_WRAP_OPERATION,
  external: false,
  navRoute: false
}, {
  name: 'Nft unwrap operation page',
  component: NftUnwrapOperationScreen,
  path: NFT_UNWRAP_OPERATION,
  external: false,
  navRoute: false
},{
  name: 'Confirm nft wrap',
  component: NftWrapConfirmScreen,
  path: CONFIRM_NFT_WRAP,
  external: false,
  navRoute: false
}, {
  name: 'Confirm nft unwrap',
  component: NftUnwrapConfirmScreen,
  path: CONFIRM_NFT_UNWRAP,
  external: false,
  navRoute: false
}];