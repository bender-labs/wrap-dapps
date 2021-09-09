import { useConfig, useIndexerApi } from '@wrap-dapps/components';
import { useEffect, useState } from 'react';
import {
  nftUnwrapToOperations,
  nftwrapsToOperations,
  UnwrapERC721Operation,
  useEthereumWalletContext,
  useTezosWalletContext,
  WrapERC721Operation
} from '@wrap-dapps/features';

export type AllOperationsHistoryState = {
  mints: WrapERC721Operation[];
  burns: UnwrapERC721Operation[];
};

export const useERC721OperationsHistory = () => {
  const { ethereumAccount } = useEthereumWalletContext();
  const { tezosAccount } = useTezosWalletContext();
  const { nonFungibleTokens, fees, wrapSignatureThreshold } = useConfig();
  const indexerApi = useIndexerApi();

  const [operations, setOperations] = useState<AllOperationsHistoryState>({
    mints: [],
    burns: []
  });

  useEffect(() => {
    const loadFinalizedOperations = async () => {
      if (!ethereumAccount() && !tezosAccount()) {
        setOperations({ burns: [], mints: [] });
        return;
      }
      const [finalizedWraps, finalizedUnwraps] = await Promise.all([
        indexerApi.fetchFinalizedNftWraps(ethereumAccount(), tezosAccount()),
        indexerApi.fetchFinalizedNftUnwraps(ethereumAccount(), tezosAccount())
      ]);
      const mintsFromIndexer = nftwrapsToOperations(
        fees,
        wrapSignatureThreshold,
        finalizedWraps
      );
      const burnsFromIndexer = nftUnwrapToOperations(
        fees,
        wrapSignatureThreshold,
        finalizedUnwraps
      );
      setOperations({
        mints: mintsFromIndexer,
        burns: burnsFromIndexer
      });
    };
    // noinspection JSIgnoredPromiseFromCall
    loadFinalizedOperations();
    const intervalId = setInterval(loadFinalizedOperations, 30000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ethereumAccount, tezosAccount]);

  return { operations, nonFungibleTokens };
};
