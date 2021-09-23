import React, { useCallback } from 'react';
import { Container, styled, Tab, Tabs } from '@mui/material';
import { paths } from '../routes';
import { Route, Switch, useHistory } from 'react-router-dom';
import { StackingConfig, useConfig } from '@wrap-dapps/components';
import { WrapStackingContractActionProps } from '../../features/wrap_stacking/types';
import { useRouteMatch } from 'react-router';
import { WrapStackingUnstake } from '../../features/wrap_stacking/WrapStackingUnstake';
import { WrapStackingClaim } from '../../features/wrap_stacking/WrapStackingClaim';
import { WrapStackingStake } from '../../features/wrap_stacking/WrapStackingStake';
import useWrapStackingContract from '../../features/wrap_stacking/hooks/useWrapStackingContract';
import BigNumber from 'bignumber.js';
import { useTokenBalance } from '@wrap-dapps/features';
import { WrapStackingStakeInfo } from '../../features/wrap_stacking/api/WrapStackingApi';

const StyledTabs = styled(Tabs)(() => ({
  color: 'white',
  marginBottom: '10px'
}));

const StyledTab = styled(Tab)(() => ({
  color: 'white',
  textTransform: 'none',
  fontWeight: 900
}));


export function WrapStackingPool() {
  const { stacking } = useConfig();
  const { path } = useRouteMatch();
  const history = useHistory();

  const {
    wrapStackingContractLoading,
    refreshWrapStackingContract,
    wrapStackingOwnerInfos
  } = useWrapStackingContract(stacking.stackingContract);

  const {
    balance,
    loading,
    refresh
  } = useTokenBalance(stacking.reward.contractAddress, stacking.reward.tokenId);

  const onTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newPath: string) => {
      history.push(newPath);
    },
    [history]
  );

  const onApply = () => {
    // noinspection JSIgnoredPromiseFromCall
    refreshWrapStackingContract();
    // noinspection JSIgnoredPromiseFromCall
    refresh();
  };

  function WithStacking(
    stacking: StackingConfig,
    onApply: () => void,
    wrapStackingOwnerInfos: {
      totalSupply: BigNumber;
      staked: BigNumber;
      reward: BigNumber;
      stakes: WrapStackingStakeInfo[];
      loading: boolean;
    },
    inputBalance: { value: BigNumber; loading: boolean },
    Comp: React.FunctionComponent<WrapStackingContractActionProps>
  ) {
    return () => (
      <Comp
        onApply={onApply}
        stacking={stacking}
        balance={inputBalance}
        wrapStackingOwnerInfos={wrapStackingOwnerInfos}
      />
    );
  }

  return (
    <Container maxWidth='sm'>
      <StyledTabs
        value={path}
        onChange={onTabChange}
        indicatorColor='primary'
        variant='fullWidth'
      >
        <StyledTab label='Stake' value={paths.WRAP_STACKING_STAKE} />
        <StyledTab label='Unstake' value={paths.WRAP_STACKING_UNSTAKE} />
        <StyledTab label='Claim' value={paths.WRAP_STACKING_CLAIM} />
      </StyledTabs>
      <Switch>
        <Route
          path={paths.WRAP_STACKING_STAKE}
          exact
          component={WithStacking(
            stacking,
            onApply,
            {
              ...wrapStackingOwnerInfos,
              loading: wrapStackingContractLoading
            },
            { value: balance, loading },
            WrapStackingStake
          )}
        />
        <Route
          path={paths.WRAP_STACKING_UNSTAKE}
          exact
          component={WithStacking(
            stacking,
            onApply,
            {
              ...wrapStackingOwnerInfos,
              loading: wrapStackingContractLoading
            },
            { value: balance, loading },
            WrapStackingUnstake
          )}
        />
        <Route
          path={paths.WRAP_STACKING_CLAIM}
          exact
          component={WithStacking(
            stacking,
            onApply,
            {
              ...wrapStackingOwnerInfos,
              loading: wrapStackingContractLoading
            },
            { value: balance, loading },
            WrapStackingClaim
          )}
        />
      </Switch>
    </Container>
  );
}