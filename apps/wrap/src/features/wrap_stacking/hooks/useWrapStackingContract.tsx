import { useCallback, useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import { TezosStateType, useTezosWalletContext } from '@wrap-dapps/components';
import { WrapStackingApi, WrapStackingStakeInfo } from '../api/WrapStackingApi';

const initialState = {
  totalSupply: new BigNumber(''),
  staked: new BigNumber(''),
  reward: new BigNumber(''),
  stakes: new Array<WrapStackingStakeInfo>()
};

export default function useWrapStackingContract(stackingContractAddress: string): {
  wrapStackingContractLoading: boolean,
  refreshWrapStackingContract: any,
  wrapStackingOwnerInfos: any,
} {
  const [loading, setLoading] = useState(false);
  const [contractInfos, setContractInfos] = useState(initialState);
  const { tezosAccount, tezosLibrary, state } = useTezosWalletContext();

  const wrapStackingApi = useMemo(() => {
    if (typeof tezosLibrary() !== 'undefined') {
      return new WrapStackingApi(tezosLibrary()!);
    }
  }, [tezosLibrary]);

  const refresh = useCallback(async () => {
    if (wrapStackingApi) {
      setLoading(true);
      const currentInfos = await wrapStackingApi.extractInfoForOwner(
        stackingContractAddress,
        tezosAccount()!
      );
      setLoading(false);
      setContractInfos(currentInfos);
    }
  }, [wrapStackingApi, stackingContractAddress, tezosAccount]);

  useEffect(() => {
    if (state.type !== TezosStateType.CONNECTED || !tezosAccount) {
      setContractInfos(initialState);
      return;
    }
    // noinspection JSIgnoredPromiseFromCall
    refresh();
  }, [refresh, state, tezosAccount]);

  return {
    wrapStackingContractLoading: loading,
    refreshWrapStackingContract: refresh,
    wrapStackingOwnerInfos: contractInfos
  };
}
