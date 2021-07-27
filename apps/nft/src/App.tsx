import React from 'react';
import { NetworkType } from '@airgap/beacon-sdk';
import {
  ConfigProvider,
  EthereumConfig,
  EthereumWalletProvider,
  NavBar,
  TezosWalletProvider,
  useNotify,
  WrapContainer,
} from '@wrap-dapps/components';
import { CssBaseline } from '@material-ui/core';
import TestComponent from './feature/nft/TestComponent';

const App = () => {
  const notify = useNotify();
  const eth: EthereumConfig = {
    formaticApiKey: 'pk_test_BF45BDB36222B03F',
    networkId: 4,
    networkName: 'Rinkeby',
    portisDAppId: '6853a134-1ca9-458d-8b96-df6e25277781',
    rpcUrl: 'https://rinkeby.infura.io/v3/1915fb285d0747d9af84c7e106fdb443',
  };
  return (
    <ConfigProvider>
      <TezosWalletProvider
        name={'Wonderfull Dapp'}
        notify={notify}
        rpcUrl={'https://florencenet.smartpy.io/'}
        networkType={NetworkType.FLORENCENET}
      >
        <EthereumWalletProvider config={eth}>
          <CssBaseline />
          <NavBar />
          <TestComponent />
          <WrapContainer />
        </EthereumWalletProvider>
      </TezosWalletProvider>
    </ConfigProvider>
  );
};

export default App;
