import { useConfig, useIndexerApi } from '@wrap-dapps/components';
import { useEthereumWalletContext, useTezosWalletContext } from '../../wallet';
import { useCallback, useEffect, useState } from 'react';
import {
  Operation,
  OperationType,
  UnwrapErc20Operation,
  unwrapToOperations,
  WrapErc20Operation,
  wrapsToOperations
} from '../state';
import { useHistory } from 'react-router';

export const wrapPage = (op: Operation) => `/wrap/${op.hash}`;
export const unwrapPage = (op: Operation) => `/unwrap/${op.hash}`;

type OperationsHistoryState = {
  mints: WrapErc20Operation[];
  burns: UnwrapErc20Operation[];
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
    burns: []
  });

  useEffect(() => {
    const loadPendingWrap = async () => {
      if (!ethereumAccount() && !tezosAccount()) {
        setOperations({ burns: [], mints: [] });
        return;
      }

      const [pendingWrap, pendingUnwrap] = await Promise.all([
        indexerApi.fetchPendingWraps(ethereumAccount(), tezosAccount()),
        indexerApi.fetchPendingUnwraps(ethereumAccount(), tezosAccount())
      ]);
      const mintsFromIndexer = wrapsToOperations(
        fees,
        wrapSignatureThreshold,
        pendingWrap
      );
      const burnsFromIndexer = unwrapToOperations(
        fees,
        wrapSignatureThreshold,
        pendingUnwrap
      );

      setOperations({
        mints: mintsFromIndexer,
        burns: burnsFromIndexer
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
