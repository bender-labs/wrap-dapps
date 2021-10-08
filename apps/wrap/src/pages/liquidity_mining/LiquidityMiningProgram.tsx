import React, { useCallback } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { paths } from '../routes';
import BigNumber from 'bignumber.js';
import { Container, styled, Tab, Tabs } from '@mui/material';
import { ProgramConfig } from '@wrap-dapps/components';
import { useTokenBalance } from '@wrap-dapps/features';
import { useProgram } from '../../features/liquidity_mining/hook/useProgram';
import { FarmingContractActionsProps } from '../../features/liquidity_mining/types';
import { LiquidityMiningStake } from '../../features/liquidity_mining/LiquidityMiningStake';
import { LiquidityMiningUnstake } from '../../features/liquidity_mining/LiquidityMiningUnstake';
import { LiquidityMiningClaim } from '../../features/liquidity_mining/LiquidityMiningClaim';
import useFarmingContract from '../../features/liquidity_mining/hook/useFarmingContract';

const MainContainer = styled(Container)(() => ({
  marginBottom: '20px'
}));

const StyledTabs = styled(Tabs)(() => ({
  color: 'white',
  marginBottom: '10px'
}));

const StyledTab = styled(Tab)(() => ({
  color: 'white',
  textTransform: 'none',
  fontWeight: 900
}));

function WithProgram(
  program: ProgramConfig,
  onApply: () => void,
  contractBalances: {
    totalSupply: BigNumber;
    staked: BigNumber;
    reward: BigNumber;
    loading: boolean;
  },
  userBalance: { value: BigNumber; loading: boolean },
  Comp: React.FunctionComponent<FarmingContractActionsProps>
) {
  return () => (
    <Comp
      onApply={onApply}
      program={program}
      balance={userBalance}
      contractBalances={contractBalances}
    />
  );
}

export function LiquidityMiningProgram() {
  const { path } = useRouteMatch();
  const { token: symbol } = useParams() as { token: string };
  const { program } = useProgram(symbol);
  const {
    farmingContract,
    pool: { contract: poolContract }
  } = program;
  const {
    contractBalances,
    contractLoading,
    refreshFarmingContract
  } = useFarmingContract(farmingContract);
  const { balance, loading, refresh } = useTokenBalance(poolContract, 0);

  const history = useHistory();
  const onTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newPath: string) => {
      history.push(newPath.replace(':token', farmingContract));
    },
    [farmingContract, history]
  );

  const onApply = () => {
    // noinspection JSIgnoredPromiseFromCall
    refreshFarmingContract();
    // noinspection JSIgnoredPromiseFromCall
    refresh();
  };

  return (
    <MainContainer maxWidth='sm'>
      <StyledTabs
        value={path}
        onChange={onTabChange}
        indicatorColor='primary'
        variant='fullWidth'
      >
        {!program.old && <StyledTab label='Stake' value={paths.LIQUIDITY_MINING_STAKE} /> }
        <StyledTab label='Unstake' value={paths.LIQUIDITY_MINING_UNSTAKE} />
        <StyledTab label='Claim' value={paths.LIQUIDITY_MINING_CLAIM} />
      </StyledTabs>
      <Switch>
        {!program.old && <Route
          path={paths.LIQUIDITY_MINING_STAKE}
          exact
          component={WithProgram(
            program,
            onApply,
            {
              ...contractBalances,
              loading: contractLoading
            },
            { value: balance, loading },
            LiquidityMiningStake
          )}
        /> }
        <Route
          path={paths.LIQUIDITY_MINING_UNSTAKE}
          exact
          component={WithProgram(
            program,
            onApply,
            {
              ...contractBalances,
              loading: contractLoading
            },
            { value: balance, loading },
            LiquidityMiningUnstake
          )}
        />
        <Route
          path={paths.LIQUIDITY_MINING_CLAIM}
          exact
          component={WithProgram(
            program,
            onApply,
            {
              ...contractBalances,
              loading: contractLoading
            },
            { value: balance, loading },
            LiquidityMiningClaim
          )}
        />
      </Switch>
    </MainContainer>
  );
}
