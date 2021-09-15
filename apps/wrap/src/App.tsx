import React from 'react';
import { AppRoute } from '@wrap-dapps/components';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FARMING_ROOT, routes } from './pages/routes';

const App = () => {
  const buildRoutes = (routes: AppRoute[]): JSX.Element[] => {
    return routes.map((route) => (<Route exact path={route.path} component={route.component} key={route.path} />));
  };

  return (
    <Switch>
      {buildRoutes(routes)}
      <Route path='/farming'>
        <Redirect to={FARMING_ROOT} />
      </Route>
      <Route path='*'>
        <Redirect to='/wrap' />
      </Route>
    </Switch>
  );
};

export default App;
