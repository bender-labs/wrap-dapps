import React, { useCallback } from 'react';
import { Container, styled, Tab, Tabs } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import { paths } from '../routes';
import ClaimAll from '../../features/farming/claim_all/ClaimAll';
import { useHistory, useRouteMatch } from 'react-router';
import WithBalancesScreen from './WithBalancesScreen';

const StyledTabs = styled(Tabs)(() => ({
  color: 'white',
  marginBottom: '10px'
}));

const StyledTab = styled(Tab)(() => ({
  color: 'white',
  textTransform: 'none',
  fontWeight: 900
}));

function AllFarms() {
  const { path } = useRouteMatch();
  const history = useHistory();

  const onTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newPath: string) => {
      history.push(newPath);
    },
    [history]
  );

  return (
    <Container maxWidth='md' sx={{paddingBottom: 10}}>
      <StyledTabs value={path} onChange={onTabChange} indicatorColor='primary'
                  variant='fullWidth'>
        <StyledTab label='Stake on all farms' value={paths.ALL_FARMS_STAKE} />
        <StyledTab label='Unstake on all farms' value={paths.ALL_FARMS_UNSTAKE} />
        <StyledTab label='Claim from all farms' value={paths.ALL_FARMS_CLAIM} />
      </StyledTabs>
      <Switch>
        <Route path={[paths.ALL_FARMS_STAKE, paths.ALL_FARMS_UNSTAKE]} exact component={WithBalancesScreen} />
        <Route path={paths.ALL_FARMS_CLAIM} exact component={ClaimAll} />
      </Switch>
    </Container>
  );
}

export default AllFarms;