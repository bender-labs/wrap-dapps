import { useCallback, useEffect, useMemo, useState } from 'react';
import FarmingContractApi, { FarmConfigWithClaimBalances } from '../../api/FarmingContractApi';
import BigNumber from 'bignumber.js';
import {
  FarmConfig,
  NotificationLevel,
  TezosStateType,
  useNotify,
  useTezosWalletContext
} from '@wrap-dapps/components';

export enum ClaimAllStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  NOT_READY = 'NOT_READY',
  READY = 'READY',
  CLAIMING = 'CLAIMING',
}

const nextStatus = (claimBalances: FarmConfigWithClaimBalances[]) => {
  const balance = claimBalances.reduce((acc, elt) => {
    return acc.plus(elt.earned);
  }, new BigNumber(0));

  if (balance.gt(0)) {
    return ClaimAllStatus.READY;
  }
  return ClaimAllStatus.NOT_READY;
};

export default function useClaimAll(farms: FarmConfig[]) {
  const { tezosAccount, tezosLibrary, state } = useTezosWalletContext();
  const connected = state.type === TezosStateType.CONNECTED && tezosAccount() !== undefined;
  const [claimAllStatus, setStatus] = useState(ClaimAllStatus.NOT_CONNECTED);
  const [claimBalances, setClaimBalances] = useState<FarmConfigWithClaimBalances[]>([]);
  const notify = useNotify();

  const api = useMemo(() => {
    if (typeof tezosLibrary() !== 'undefined') {
      return new FarmingContractApi(tezosLibrary()!);
    }
  }, [tezosLibrary]);

  useEffect(() => {
    if (typeof tezosAccount() !== 'undefined' && typeof tezosLibrary() !== 'undefined' && typeof api !== 'undefined') {
      const loadClaimBalances = async () => {
        setClaimBalances(await api.claimBalances(farms, tezosAccount()!));
      };

      if (farms.length > 0 && state.type === TezosStateType.CONNECTED) {
        loadClaimBalances();
      }
    }
  }, [farms, tezosAccount, tezosLibrary, state]);

  useEffect(() => {
    if (!connected) {
      setStatus(ClaimAllStatus.NOT_CONNECTED);
      return;
    }
    setStatus(nextStatus(claimBalances));
  }, [connected, claimBalances]);

  const claimAll = useCallback(async (successCallback: () => void) => {
    const api = new FarmingContractApi(tezosLibrary()!);
    setStatus(ClaimAllStatus.CLAIMING);
    try {
      await api.claimAll(claimBalances);
      successCallback();
      setStatus(ClaimAllStatus.NOT_READY);
      notify(NotificationLevel.SUCCESS, 'Claiming operation sent to blockchain');
    } catch (error) {
      notify(NotificationLevel.ERROR, error.description);
      setStatus(ClaimAllStatus.READY);
    }
  }, [tezosLibrary, claimBalances, notify]);

  return {
    claimBalances,
    setClaimBalances,
    claimAllStatus,
    claimAll
  };
};