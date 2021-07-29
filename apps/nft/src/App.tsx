import React from 'react';
import { NetworkType } from '@airgap/beacon-sdk';
import {
  ConfigProvider,
  EthereumWalletProvider,
  NavBar,
  TezosWalletProvider,
  useNotify,
  WrapContainer
} from '@wrap-dapps/components';
import { CssBaseline } from '@material-ui/core';

function initialConfig() {
  return {
    environmentName: process.env.RAZZLE_WRAP_ENVIRONMENT!,
    indexerUrl: process.env.RAZZLE_INDEXER!,
    statisticsUrl: process.env.RAZZLE_STATISTICS!,
    ethereum: {
      rpcUrl: process.env.RAZZLE_ETH_RPC!,
      networkId: +process.env.RAZZLE_ETH_NETWORK_ID!,
      networkName: process.env.RAZZLE_ETH_NETWORK_NAME!,
      formaticApiKey: process.env.RAZZLE_FORTMATIC_API_KEY!,
      portisDAppId: process.env.RAZZLE_PORTIS_DAPP_ID!
    },
    tezos: {
      rpcUrl: process.env.RAZZLE_TZ_RPC!,
      networkId: process.env.RAZZLE_TZ_NETWORK_ID! as NetworkType,
      networkName: process.env.RAZZLE_TZ_NETWORK_NAME!
    }
  };
}

const App = () => {
  const notify = useNotify();
  const initConfig = initialConfig();
  return (
    <ConfigProvider initConfig={initConfig}>
      <TezosWalletProvider
        name={'Wonderful dApp'}
        notify={notify}
      >
        <EthereumWalletProvider>
          <CssBaseline />
          <NavBar />
          <WrapContainer />
        </EthereumWalletProvider>
      </TezosWalletProvider>
    </ConfigProvider>
  );
};

export default App;
