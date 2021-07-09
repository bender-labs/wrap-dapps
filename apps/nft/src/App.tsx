import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import { TezosWalletProvider } from '@wrap-dapps/components/wallet/tezos/useTezosWallet';
import { useNotify } from '@wrap-dapps/components/notification/useNotify';
import { NetworkType } from '@airgap/beacon-sdk';
import NavBar from './components/NavBar';

const App = () => {
  const notify = useNotify();
  return (
    <TezosWalletProvider
      name={'Wonderfull Dapp'}
      notify={notify}
      rpcUrl={'https://florencenet.smartpy.io/'}
      networkType={NetworkType.FLORENCENET}
    >
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </TezosWalletProvider>
  );
};

export default App;
