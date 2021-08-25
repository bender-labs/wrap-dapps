import { NftUnwrapSelectorScreen, NftWrapSelectorScreen } from './index';
import { AppRoute } from '@wrap-dapps/components';
import { Operation } from '@wrap-dapps/features';
import { NftInstance } from '../features/nft/api/types';
import { NftWrapConfirmScreen } from './NftWrapConfirmScreen';
import NftWrapOperationScreen from './NftWrapOperationScreen';

const confirmWrapPath = '/confirm-wrap-nft';
const confirmUnwrapPath = '/confirm-unwrap-nft';
const wrapOperationPath = '/wrap-nft';

const CONFIRM_NFT_WRAP = confirmWrapPath + '/:nftCollectionAddress/:tokenId';
const NFT_WRAP_OPERATION = wrapOperationPath + '/:transactionHash';
const ETHEREUM_DASHBOARD = '/ethereum';
const TEZOS_DASHBOARD = '/tezos';

export const paths = {
  CONFIRM_NFT_WRAP,
  NFT_WRAP_OPERATION,
  ETHEREUM_DASHBOARD,
  TEZOS_DASHBOARD
};

export const nftOperationPage = (op: Operation) => `${wrapOperationPath}/${op.hash}`;
export const confirmNftWrap = (nftInstance: NftInstance) => `${confirmWrapPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;
export const confirmNftUnwrap = (nftInstance: NftInstance) => `${confirmUnwrapPath}/${nftInstance.nftCollection.ethereumContractAddress}/${nftInstance.id}`;

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
  name: 'Confirm nft wrap',
  component: NftWrapConfirmScreen,
  path: CONFIRM_NFT_WRAP,
  external: false,
  navRoute: false
}];