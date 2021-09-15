import React, { useCallback } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { Alert, AlertTitle, Box, Container, styled, Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import { paths, farmStakePageRoute } from '../routes';
import BigNumber from 'bignumber.js';
import { FarmConfig, useConfig } from '@wrap-dapps/components';
import { FarmingContractActionsProps } from '../../features/fees_farming/types';
import useFarmingContract from '../../features/fees_farming/farm/hooks/useFarmingContract';
import { useTokenBalance } from '@wrap-dapps/features';
import { Unstake } from '../../features/fees_farming/unstake/Unstake';
import { useOldFarm } from '../../features/fees_farming/farm/hooks/useOldFarm';
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

const StyledLink = styled(Link)(({theme}) => ({
  color: theme.palette.primary.main
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
  const { farms } = useConfig();
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

  const newFarm = farms.find(validFarm => (validFarm.rewardTokenContractAddress === farm.rewardTokenContractAddress && validFarm.rewardTokenId === farm.rewardTokenId));

  return (
    <Container maxWidth='sm'>
      <Box marginBottom={2} marginTop={2}>
        <Alert severity='info'>
          <AlertTitle>This is a deactivated farm!</AlertTitle>
          <p>You can still unstake your $WRAP tokens and claim your rewards.</p>
          {newFarm ?
            <p>you can find the new {farm.rewardTokenSymbol} farm <StyledLink to={farmStakePageRoute(newFarm.farmContractAddress)}>here</StyledLink></p>
            :null
          }
        </Alert>
      </Box>
      <StyledTabs
        value={path}
        onChange={onTabChange}
        indicatorColor='primary'
        variant='fullWidth'
      >
        <StyledTab label='Unstake' value={paths.OLD_FARM_UNSTAKE} />
        <StyledTab label='Claim' value={paths.OLD_FARM_CLAIM} />
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
        <Route
          path={paths.OLD_FARM_CLAIM}
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
