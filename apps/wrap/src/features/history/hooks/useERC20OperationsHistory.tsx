import { useEffect, useState } from 'react';
import {
  UnwrapErc20Operation,
  unwrapToOperations,
  useEthereumWalletContext,
  useTezosWalletContext,
  WrapErc20Operation,
  wrapsToOperations
} from '@wrap-dapps/features';
import { useConfig, useIndexerApi } from '@wrap-dapps/components';

export type AllOperationsHistoryState = {
  mints: WrapErc20Operation[];
  burns: UnwrapErc20Operation[];
};

export const useERC20OperationsHistory = () => {
  const { tezosAccount } = useTezosWalletContext();
  const { ethereumAccount } = useEthereumWalletContext();
  const indexerApi = useIndexerApi();
  const [operations, setOperations] = useState<AllOperationsHistoryState>({
    mints: [],
    burns: []
  });
  const { fungibleTokens, fees, wrapSignatureThreshold } = useConfig();

  useEffect(() => {
    const loadFinalizedOperations = async () => {
      if (!ethereumAccount() && !tezosAccount()) {
        setOperations({ burns: [], mints: [] });
        return;
      }
      const [finalizedWraps, finalizedUnwraps] = await Promise.all([
        indexerApi.fetchFinalizedWraps(ethereumAccount(), tezosAccount()),
        indexerApi.fetchFinalizedUnwraps(ethereumAccount(), tezosAccount())
      ]);
      const mintsFromIndexer = wrapsToOperations(
        fees,
        wrapSignatureThreshold,
        finalizedWraps
      );
      const burnsFromIndexer = unwrapToOperations(
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

  return { operations, fungibleTokens };
};
