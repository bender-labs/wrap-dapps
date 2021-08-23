import { useConfig, useIndexerApi } from '@wrap-dapps/components';
import { useEthereumWalletContext, useTezosWalletContext } from '../../wallet';
import { useCallback, useEffect, useState } from 'react';
import {
  nftUnwrapToOperations,
  nftwrapsToOperations,
  Operation,
  OperationType,
  UnwrapErc20Operation,
  UnwrapERC721Operation,
  unwrapToOperations,
  WrapErc20Operation,
  WrapERC721Operation,
  wrapsToOperations
} from '../state';
import { useHistory } from 'react-router';

export const wrapPage = (op: Operation) => `/wrap/${op.hash}`;
export const wrapNftPage = (op: Operation) => `/wrap-nft/${op.hash}`;
export const unwrapPage = (op: Operation) => `/unwrap/${op.hash}`;
export const unwrapNftPage = (op: Operation) => `/unwrap-nft/${op.hash}`;

type OperationsHistoryState = {
  mints: WrapErc20Operation[];
  nftMints: WrapERC721Operation[];
  burns: UnwrapErc20Operation[];
  nftBurns: UnwrapERC721Operation[];
};

export const usePendingOperationsHistory = () => {
  const { tezosAccount } = useTezosWalletContext();
  const { ethereumAccount } = useEthereumWalletContext();
  const history = useHistory();
  const indexerApi = useIndexerApi();
  const { fees, wrapSignatureThreshold } = useConfig();
  const [count, setCount] = useState(0);
  const [canFetch, setCanFetch] = useState(false);

  const [operations, setOperations] = useState<OperationsHistoryState>({
    mints: [],
    nftMints: [],
    burns: [],
    nftBurns: []
  });

  useEffect(() => {
    const loadPendingWrap = async () => {
      if (!ethereumAccount() && !tezosAccount()) {
        setOperations({ burns: [], nftMints: [], mints: [], nftBurns: [] });
        return;
      }

      const [pendingWrap, pendingNftWrap, pendingUnwrap, pendingNftUnwrap] = await Promise.all([
        indexerApi.fetchPendingWraps(ethereumAccount(), tezosAccount()),
        indexerApi.fetchPendingNftWraps(ethereumAccount(), tezosAccount()),
        indexerApi.fetchPendingUnwraps(ethereumAccount(), tezosAccount()),
        indexerApi.fetchPendingNftUnwraps(ethereumAccount(), tezosAccount()),
      ]);
      const mintsFromIndexer = wrapsToOperations(
        fees,
        wrapSignatureThreshold,
        pendingWrap
      );
      const nftMintsFromIndexer = nftwrapsToOperations(
        fees,
        wrapSignatureThreshold,
        pendingNftWrap
      );
      const burnsFromIndexer = unwrapToOperations(
        fees,
        wrapSignatureThreshold,
        pendingUnwrap
      );
      const nftBurnsFromIndexer = nftUnwrapToOperations(
        fees,
        wrapSignatureThreshold,
        pendingNftUnwrap
      );

      setOperations({
        mints: mintsFromIndexer,
        nftMints: nftMintsFromIndexer,
        burns: burnsFromIndexer,
        nftBurns: nftBurnsFromIndexer
      });
    };
    // noinspection JSIgnoredPromiseFromCall
    loadPendingWrap();
    const intervalId = setInterval(loadPendingWrap, 20000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ethereumAccount, tezosAccount]);

  const selectOperation = useCallback(
    (op: Operation) => {
      switch (op.type) {
        case OperationType.WRAP:
          history.push(wrapPage(op));
          break;
        case OperationType.UNWRAP:
          history.push(unwrapPage(op));
          break;
        case OperationType.WRAP_NFT:
          history.push(wrapNftPage(op));
          break;
        case OperationType.UNWRAP_NFT:
          history.push(unwrapNftPage(op));
          break;
      }
    },
    [history]
  );

  useEffect(() => setCount(operations.burns.length + operations.mints.length), [
    operations
  ]);

  useEffect(
    () => setCanFetch(tezosAccount() !== undefined || ethereumAccount() !== undefined),
    [tezosAccount, ethereumAccount]
  );

  return { operations, count, canFetch, selectOperation };
};
