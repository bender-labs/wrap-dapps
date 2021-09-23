import React, { useCallback } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { Container, styled, Tab, Tabs } from '@mui/material';
import { paths } from '../routes';
import BigNumber from 'bignumber.js';
import { FarmConfig } from '@wrap-dapps/components';
import { FarmingContractActionsProps } from '../../features/fees_farming/types';
import useFarmingContract from '../../features/fees_farming/farm/hooks/useFarmingContract';
import { useFarm } from '../../features/fees_farming/farm/hooks/useFarm';
import Stake from '../../features/fees_farming/stake/Stake';
import { useTokenBalance } from '@wrap-dapps/features';
import { Unstake } from '../../features/fees_farming/unstake/Unstake';
import Claim from '../../features/fees_farming/claim/Claim';

const StyledTabs = styled(Tabs)(() => ({
  color: 'white',
  marginBottom: '10px'
}));

const StyledTab = styled(Tab)(() => ({
  color: 'white',
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

export default function Farm() {
  const { path } = useRouteMatch();
  const { farm_address } = useParams() as { farm_address: string };
  const { farm } = useFarm(farm_address);

  const { farmBalances, farmLoading, refreshFarmingContract } = useFarmingContract(farm.farmContractAddress);
  console.log(farmBalances);
  console.log(farmLoading);

  const {
    balance,
    loading,
    refresh
  } = useTokenBalance(farm.farmStakedToken.contractAddress, farm.farmStakedToken.tokenId);

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
        <StyledTab label='Stake' value={paths.FARM_STAKE} />
        <StyledTab label='Unstake' value={paths.FARM_UNSTAKE} />
        <StyledTab label='Claim' value={paths.FARM_CLAIM} />
      </StyledTabs>
      <Switch>
        <Route
          path={paths.FARM_STAKE}
          exact
          component={WithFarm(
            farm,
            onApply,
            {
              ...farmBalances,
              loading: farmLoading
            },
            { value: balance, loading },
            Stake
          )}
        />
        <Route
          path={paths.FARM_UNSTAKE}
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
        <Route
          path={paths.FARM_CLAIM}
          exact
          component={WithFarm(
            farm,
            onApply,
            {
              ...farmBalances,
              loading: farmLoading
            },
            { value: balance, loading },
            Claim
          )}
        />
      </Switch>
    </Container>
  );
}
