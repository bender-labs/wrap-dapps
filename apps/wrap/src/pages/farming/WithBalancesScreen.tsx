import { BalancesState } from '../../features/farming/balances-reducer';
import React, { useEffect } from 'react';
import { Action, useTokenBalance } from '@wrap-dapps/features';
import BigNumber from 'bignumber.js';
import { FarmConfig, useConfig } from '@wrap-dapps/components';
import useBalances from '../../features/farming/useBalances';
import { Route } from 'react-router-dom';
import { paths } from '../routes';
import StakeAll from '../../features/farming/stake_all/StakeAll';
import UnstakeAll from '../../features/farming/unstake_all/UnstakeAll';

export interface FarmAllProps {
  balances: BalancesState,
  balanceDispatch: React.Dispatch<Action>,
  balance: BigNumber,
  loading: boolean,
  refresh: () => Promise<void>,
  farms: FarmConfig[],
}

function WithBalancesScreen() {
  const { balances, balanceDispatch } = useBalances();
  const { farms, oldFarms } = useConfig();

  const {
    balance,
    loading,
    refresh
  } = useTokenBalance(oldFarms[0].farmStakedToken.contractAddress, oldFarms[0].farmStakedToken.tokenId);

  useEffect(() => {
    if (!balances.isDirty && balances.balances.length > 0) {
      refresh();
    }
  }, [balances, refresh]);

  return (
    <>
      <Route path={paths.ALL_FARMS_STAKE} exact
             component={() => <StakeAll balances={balances} balanceDispatch={balanceDispatch} balance={balance}
                                        loading={loading}
                                        refresh={refresh} farms={farms} />} />
      <Route path={paths.ALL_FARMS_UNSTAKE} exact
             component={() => <UnstakeAll balances={balances} balanceDispatch={balanceDispatch} balance={balance}
                                          loading={loading}
                                          refresh={refresh} farms={farms} />} />
      <Route path={paths.OLD_ALL_FARMS_UNSTAKE} exact
             component={() => <UnstakeAll balances={balances} balanceDispatch={balanceDispatch} balance={balance}
                                          loading={loading}
                                          refresh={refresh} farms={oldFarms} />} />
    </>
  );
}

export default WithBalancesScreen;