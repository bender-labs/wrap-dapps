import { NftInstance } from '../api/types';
import { createEthereumNftApi } from '../api/EthereumNftApi';
import { useEffect, useMemo, useState } from 'react';
import { NonFungibleToken } from '@wrap-dapps/api';
import { useIndexerApi } from '@wrap-dapps/components';
import { ethers } from 'ethers';

export interface NftQuery {
  loading: boolean;
  tokens: NftInstance[];
  totalTokens: number;
}

interface Props {
  tezosAccount: string;
  ethereumToolkit: ethers.providers.Provider;
  nftCollection: NonFungibleToken;
  limitPerPage: number;
  currentPage: number;
}

export function useTezosNftQuery(props: Props): NftQuery {
  const { tezosAccount, ethereumToolkit, nftCollection, limitPerPage, currentPage } = props;
  const [state, setState] = useState<NftQuery>({ loading: false, tokens: [], totalTokens: 0 });
  const indexerApi = useIndexerApi();
  const nftApi = useMemo(() => createEthereumNftApi(ethereumToolkit), [ethereumToolkit]);

  useEffect(() => {
    const fetch = async () => {
      setState({ ...state, loading: true });
      const indexerTezosNftPayload = await indexerApi.fetchTezosNft(tezosAccount, nftCollection.tezosWrappingContract);
      const currentOffset = limitPerPage * (currentPage - 1);
      const results = await Promise.all(indexerTezosNftPayload.result.slice(currentOffset, currentOffset + limitPerPage).map(async (payload): Promise<NftInstance> => {
        return await nftApi.fetchNftTokenMetadata(nftCollection, payload.tokenId);
      }));
      setState({ loading: false, tokens: results, totalTokens: indexerTezosNftPayload.result.length });
    };
    // noinspection JSIgnoredPromiseFromCall
    fetch();
  }, [tezosAccount, nftCollection, limitPerPage, currentPage]);

  return state;
}
