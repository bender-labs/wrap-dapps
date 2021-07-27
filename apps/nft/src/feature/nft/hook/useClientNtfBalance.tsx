import { NftApi } from '../api/types';
import { Token } from '@wrap-dapps/api';

interface State {
  collections: Token[];
}

interface Props {
  api: NftApi;
  address: string;
}

export function useClientNtfBalance(props: Props) {}
