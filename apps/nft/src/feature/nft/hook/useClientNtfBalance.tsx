import { NftApi, NftInstance } from '../api/types';
import { ethers } from 'ethers';
import { createNftApi } from '../api/NftApi';
import { useEffect, useMemo, useState } from 'react';

interface State {
  loading: boolean;
  tokens: NftInstance[];
  totalTokens: number;
}

interface Props {
  address: string;
  nftAddress: string;
  ethereumToolkit: ethers.providers.Provider;
  limitPerPage: number;
  currentPage: number;
}

export function useClientNtfBalance(props: Props) {
  const [state, setState] = useState<State>({ loading: false, tokens: [], totalTokens: 0 });
  const nftApi = useMemo(() => createNftApi(props.ethereumToolkit), [props.ethereumToolkit]);

  useEffect(() => {

    const fetch = async () => {
      setState({ ...state, loading: true });
      const result = await nftApi.fetchUserNftInstances(props.nftAddress, props.address, {limit: props.limitPerPage, offset: props.limitPerPage*(props.currentPage-1)});
      setState({ loading: false, tokens: result.results, totalTokens: result.total });
    };
    // noinspection JSIgnoredPromiseFromCall
    fetch();
  }, [props.address, props.nftAddress, nftApi, props.limitPerPage, props.currentPage]);

  return state;
}
