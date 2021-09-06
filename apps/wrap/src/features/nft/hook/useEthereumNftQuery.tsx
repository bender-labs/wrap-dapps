import { NftInstance } from '../api/types';
import { ethers } from 'ethers';
import { createEthereumNftApi } from '../api/EthereumNftApi';
import { useEffect, useMemo, useState } from 'react';
import { NonFungibleToken } from '@wrap-dapps/api';

export interface NftQuery {
  loading: boolean;
  tokens: NftInstance[];
  totalTokens: number;
}

interface Props {
  ethereumAccount: string;
  nftCollection: NonFungibleToken;
  ethereumToolkit: ethers.providers.Provider;
  limitPerPage: number;
  currentPage: number;
}

export function useEthereumNftQuery(props: Props): NftQuery {
  const { ethereumAccount, ethereumToolkit, nftCollection, limitPerPage, currentPage } = props;
  const [state, setState] = useState<NftQuery>({ loading: false, tokens: [], totalTokens: 0 });
  const nftApi = useMemo(() => createEthereumNftApi(ethereumToolkit), [ethereumToolkit]);

  useEffect(() => {
    const fetch = async () => {
      setState({ ...state, loading: true });
      const result = await nftApi.fetchNftTokensWithMetadata(nftCollection, ethereumAccount, {
        limit: limitPerPage,
        offset: limitPerPage * (currentPage - 1)
      });
      setState({ loading: false, tokens: result.results, totalTokens: result.total });
    };
    // noinspection JSIgnoredPromiseFromCall
    fetch();
  }, [ethereumAccount, nftCollection, nftApi, limitPerPage, currentPage]);

  return state;
}
