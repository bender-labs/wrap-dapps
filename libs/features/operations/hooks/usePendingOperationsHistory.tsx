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
    nftBurns: []
  });

  useEffect(() => {
    const loadPendingWrap = async () => {
      if (!ethereumAccount() && !tezosAccount()) {
        setOperations({ nftBurns: [] });
        return;
      }

      const [pendingNftUnwrap] = await Promise.all([
        indexerApi.fetchPendingNftUnwraps(ethereumAccount(), tezosAccount())
      ]);
      const nftBurnsFromIndexer = nftUnwrapToOperations(
        fees,
        wrapSignatureThreshold,
        pendingNftUnwrap
      );

      setOperations({
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

  useEffect(() => setCount(operations.nftBurns.length), [
    operations
  ]);

  useEffect(
    () => setCanFetch(tezosAccount() !== undefined || ethereumAccount() !== undefined),
    [tezosAccount, ethereumAccount]
  );

  return { operations, count, canFetch, selectOperation };
};
