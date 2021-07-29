import { NftApi, NftInstance } from '../api/types';
import { Token } from '@wrap-dapps/api';
import { ethers } from 'ethers';
import { createNftApi } from '../api/NftApi';
import { useEffect, useMemo, useState } from 'react';

interface State {
  loading: boolean;
  tokens: NftInstance[];
}

interface Props {
  address: string;
  nftAddress: string;
  ethereumToolkit: ethers.providers.Provider;
}

export function useClientNtfBalance(props: Props) {
  const [state, setState] = useState<State>({ loading: false, tokens: [] });
  const nftApi = useMemo(() => createNftApi(props.ethereumToolkit), [props.ethereumToolkit]);

  useEffect(() => {

    const fetch = async () => {
      setState({ ...state, loading: true });
      const result = await nftApi.fetchUserNftInstances(props.nftAddress, props.address);
      setState({ loading: false, tokens: result.results });
    };
    // noinspection JSIgnoredPromiseFromCall
    fetch();
  }, [props.address, props.nftAddress, nftApi]);

  return state;
}
