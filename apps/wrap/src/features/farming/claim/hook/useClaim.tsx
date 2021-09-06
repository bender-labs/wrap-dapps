import { useCallback, useEffect, useState } from 'react';
import FarmingContractApi from '../../api/FarmingContractApi';
import {
  FarmConfig,
  NotificationLevel,
  TezosStateType,
  useNotify,
  useTezosWalletContext
} from '@wrap-dapps/components';

export enum ClaimStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  READY = 'READY',
  CLAIMING = 'CLAIMING',
}

export default function useClaim(farm: FarmConfig) {
  const { tezosAccount, tezosLibrary, state } = useTezosWalletContext();
  const [claimStatus, setStatus] = useState(ClaimStatus.NOT_CONNECTED);
  const connected = state.type === TezosStateType.CONNECTED
    && tezosAccount() !== undefined;
  const notify = useNotify();

  useEffect(() => {
    if (!connected) {
      setStatus(ClaimStatus.NOT_CONNECTED);
      return;
    }
    setStatus(ClaimStatus.READY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  const claim = useCallback(async () => {
    const api = new FarmingContractApi(tezosLibrary()!);
    setStatus(ClaimStatus.CLAIMING);
    try {
      await api.claim(farm.farmContractAddress);
      setStatus(ClaimStatus.READY);
      notify(NotificationLevel.SUCCESS, 'Claiming done');
    } catch (error) {
      notify(NotificationLevel.ERROR, error.description);
      setStatus(ClaimStatus.READY);
    }
  }, [tezosLibrary, farm.farmContractAddress, notify]);

  return {
    claimStatus,
    claim
  };
}
