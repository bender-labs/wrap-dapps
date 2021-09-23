import { useCallback, useEffect, useState } from 'react';
import {
  NotificationLevel,
  StackingConfig,
  TezosStateType,
  useNotify,
  useTezosWalletContext
} from '@wrap-dapps/components';
import { WrapStackingApi } from '../api/WrapStackingApi';
import BigNumber from 'bignumber.js';

export enum WrapStackingClaimStatus {
  NOT_CONNECTED = 'NOT_CONNECTED',
  READY = 'READY',
  NOT_READY = 'NOT_READY',
  CLAIMING = 'CLAIMING',
}

export default function useWrapStackingClaim(stacking: StackingConfig, balance: BigNumber) {
  const { tezosAccount, tezosLibrary, state } = useTezosWalletContext();
  const [claimStatus, setStatus] = useState(WrapStackingClaimStatus.NOT_CONNECTED);
  const connected = state.type === TezosStateType.CONNECTED
    && tezosAccount() !== undefined;
  const notify = useNotify();

  const nextStatus = (balance: BigNumber) => {
    if (balance.isGreaterThan(0, 10)) {
      return WrapStackingClaimStatus.READY;
    }
    return WrapStackingClaimStatus.NOT_READY;
  };

  useEffect(() => {
    if (!connected) {
      setStatus(WrapStackingClaimStatus.NOT_CONNECTED);
      return;
    }
    setStatus(nextStatus(balance));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  useEffect(() => {
    if (!connected) {
      setStatus(WrapStackingClaimStatus.NOT_CONNECTED);
      return;
    }
    setStatus(nextStatus(balance));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance]);

  const claim = useCallback(async () => {
    const api = new WrapStackingApi(tezosLibrary()!);
    setStatus(WrapStackingClaimStatus.CLAIMING);
    try {
      await api.claim(stacking.stackingContract);
      setStatus(WrapStackingClaimStatus.READY);
      notify(NotificationLevel.SUCCESS, 'Claiming done');
    } catch (error) {
      notify(NotificationLevel.ERROR, error.description);
      setStatus(WrapStackingClaimStatus.READY);
    }
  }, [tezosLibrary, notify]);

  const claimAndRestake = useCallback(async () => {
    const api = new WrapStackingApi(tezosLibrary()!);
    setStatus(WrapStackingClaimStatus.CLAIMING);
    try {
      await api.claimAndRestake(stacking, tezosAccount(),balance );
      setStatus(WrapStackingClaimStatus.READY);
      notify(NotificationLevel.SUCCESS, 'Claiming done');
    } catch (error) {
      notify(NotificationLevel.ERROR, error.description);
      setStatus(WrapStackingClaimStatus.READY);
    }
  }, [tezosLibrary, notify]);

  return {
    claimStatus,
    claim,
    claimAndRestake
  };
}
