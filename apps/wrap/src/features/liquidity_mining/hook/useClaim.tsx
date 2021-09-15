import { useCallback, useEffect, useState } from 'react';
import { TezosStateType, useTezosWalletContext } from '@wrap-dapps/features';
import { NotificationLevel, ProgramConfig, useNotify } from '@wrap-dapps/components';
import { LiquidityMiningApi } from '../api/LiquidityMiningApi';

export enum ClaimStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  READY = 'READY',
  CLAIMING = 'CLAIMING',
}

export default function useClaim(token: ProgramConfig) {
  const { state: tezosState, tezosLibrary, tezosAccount } = useTezosWalletContext();
  const [claimStatus, setStatus] = useState(ClaimStatus.NOT_CONNECTED);
  const connected = tezosState.type === TezosStateType.CONNECTED && tezosAccount() !== undefined;
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
    const api = new LiquidityMiningApi(tezosLibrary()!);
    setStatus(ClaimStatus.CLAIMING);
    try {
      await api.claim(token.farmingContract);
      setStatus(ClaimStatus.READY);
      notify(NotificationLevel.SUCCESS, 'Claiming done');
    } catch (error) {
      notify(NotificationLevel.ERROR, error.description);
      setStatus(ClaimStatus.READY);
    }
  }, [tezosLibrary, token.farmingContract, notify]);

  return {
    claimStatus,
    claim
  };
}
