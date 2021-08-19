import React, { useEffect, useState } from 'react';
import {
  AppRoute,
  EthereumStateType,
  HalfCard,
  MultiConnect,
  TezosStateType,
  useEthereumWalletContext,
  useTezosWalletContext
} from '@wrap-dapps/components';
import { Route, Switch } from 'react-router-dom';
import { routes } from './Routes';
import { CardContent, Container } from '@material-ui/core';

const App = () => {
  const { state: tzState } = useTezosWalletContext();
  const { state: ethState } = useEthereumWalletContext();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(
      tzState.type === TezosStateType.CONNECTED &&
      ethState.type === EthereumStateType.CONNECTED
    );
  }, [tzState, ethState]);

  const buildRoutes = (routes: AppRoute[]): JSX.Element[] => {
    return routes.map((route) => (<Route exact path={route.path} component={route.component} key={route.path} />));
  };

  if (connected) {
    return (
      <Switch>
        {buildRoutes(routes)}
      </Switch>
    );
  } else {
    return (
      <Container sx={{ paddingBottom: 3 }}>
        <HalfCard>
          <CardContent>
            <MultiConnect />
          </CardContent>
        </HalfCard>
      </Container>
    );
  }
};

export default App;
