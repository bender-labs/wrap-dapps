import React, { useCallback } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { Container, styled, Tab, Tabs } from '@material-ui/core';
import { paths } from '../routes';
import BigNumber from 'bignumber.js';
import { FarmConfig } from '@wrap-dapps/components';
import { FarmingContractActionsProps } from '../../features/farming/types';
import useFarmingContract from '../../features/farming/farm/hooks/useFarmingContract';
import { useTokenBalance } from '@wrap-dapps/features';
import { Unstake } from '../../features/farming/unstake/Unstake';
import { useOldFarm } from '../../features/farming/farm/hooks/useOldFarm';

const StyledTabs = styled(Tabs)(() => ({
  color: 'white',
  marginBottom: '10px'
}));

const StyledTab = styled(Tab)(() => ({
  textTransform: 'none',
  fontWeight: 900
}));

function WithFarm(
  farm: FarmConfig,
  onApply: () => void,
  farmBalances: {
    totalSupply: BigNumber;
    staked: BigNumber;
    reward: BigNumber;
    loading: boolean;
  },
  inputBalance: { value: BigNumber; loading: boolean },
  Comp: React.FunctionComponent<FarmingContractActionsProps>
) {
  return () => (
    <Comp
      onApply={onApply}
      farm={farm}
      inputBalance={inputBalance}
      farmBalances={farmBalances}
    />
  );
}

export default function OldFarm() {
  const { path } = useRouteMatch();
  const { farm_address } = useParams() as { farm_address: string };
  const { farm } = useOldFarm(farm_address);
  const { farmBalances, farmLoading, refreshFarmingContract } =
    useFarmingContract(farm.farmContractAddress);
  const { balance, loading, refresh } = useTokenBalance(
    farm.farmStakedToken.contractAddress,
    farm.farmStakedToken.tokenId
  );

  const history = useHistory();
  const onTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newPath: string) => {
      history.push(newPath.replace(':farm_address', farm.farmContractAddress));
    },
    [farm, history]
  );

  const onApply = () => {
    // noinspection JSIgnoredPromiseFromCall
    refreshFarmingContract();
    // noinspection JSIgnoredPromiseFromCall
    refresh();
  };

  return (
    <Container maxWidth='sm'>
      <StyledTabs
        value={path}
        onChange={onTabChange}
        indicatorColor='primary'
        variant='fullWidth'
      >
        <StyledTab label='Unstake' value={paths.OLD_FARM_UNSTAKE} />
      </StyledTabs>
      <Switch>
        <Route
          path={paths.OLD_FARM_UNSTAKE}
          exact
          component={WithFarm(
            farm,
            onApply,
            {
              ...farmBalances,
              loading: farmLoading
            },
            { value: balance, loading },
            Unstake
          )}
        />
      </Switch>
    </Container>
  );
}
