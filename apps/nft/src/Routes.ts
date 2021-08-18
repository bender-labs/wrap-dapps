import { NftWrapSelectorScreen, NftUnwrapSelectorScreen } from './pages';
import {AppRoute} from '@wrap-dapps/components';

export const routes: AppRoute[] = [{
  name: 'Wrap',
  component: NftWrapSelectorScreen,
  path: '/ethereum',
  external: false
},{
  name: 'Unwrap',
  component: NftUnwrapSelectorScreen,
  path: '/tezos',
  external: false
}];