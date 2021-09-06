import { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { TezosToolkit } from '@taquito/taquito';
import { TezosStateType, useTezosWalletContext } from '@wrap-dapps/components';

enum BalanceStrategy {
  VIEW = 'VIEW',
  LAMBDA = 'LAMBDA',
}

interface BalanceFetcher {
  (
    library: TezosToolkit,
    owner: string,
    address: string,
    tokenId: number
  ): Promise<BigNumber>;
}

const fetchByLambda: BalanceFetcher = async (
  library,
  owner,
  address,
  tokenId
) => {
  const contract = await library.contract.at(address);
  const [{ balance }] = await contract.views
    .balance_of([{ owner, token_id: tokenId }])
    .read();
  return balance;
};

const fetchers: { [key in keyof typeof BalanceStrategy]: BalanceFetcher } = {
  LAMBDA: fetchByLambda,
  VIEW: fetchByLambda
};

export function useTokenBalance(
  address: string,
  tokenId: number,
  strategy = BalanceStrategy.LAMBDA
) {
  const { tezosAccount, tezosLibrary, state } = useTezosWalletContext();
  const connected = state.type === TezosStateType.CONNECTED && tezosAccount() !== undefined;
  const [balance, setBalance] = useState(new BigNumber(''));
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!connected) {
      return;
    }
    setLoading(true);
    const result = await fetchers[strategy](
      tezosLibrary()!,
      tezosAccount()!,
      address,
      tokenId
    );
    setLoading(false);
    setBalance(result);
  }, [strategy, connected, tezosLibrary, tezosAccount, address, tokenId]);

  useEffect(() => {
    if (!connected) {
      setBalance(new BigNumber(''));
      return;
    }
    // noinspection JSIgnoredPromiseFromCall
    refresh();
  }, [refresh, connected]);

  return { balance, loading, refresh, connected };
}
