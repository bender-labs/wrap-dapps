import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { render } from 'react-dom';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ConfigProvider,
  Environment,
  EthereumWalletProvider,
  InitialConfig,
  liquidityMiningPrograms, oldLiquidityMiningPrograms,
  TezosWalletProvider,
  ThemeProvider,
  WRAP_TOKEN_GRANADA_TESTNET,
  WRAP_TOKEN_MAINNET
} from '@wrap-dapps/components';
import './main.css';
import { NetworkType } from '@airgap/beacon-sdk';
import { RecoilRoot } from 'recoil';
import { ResponsiveDrawer } from './pages/ResponsiveDrawer';

function getLibrary(provider: ExternalProvider): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const env =
  Environment[
    (process.env.RAZZLE_WRAP_ENVIRONMENT ||
      'TESTNET') as keyof typeof Environment
    ];

const initConfig: InitialConfig = {
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
  },
  tzktLink: process.env.RAZZLE_TZKT_LINK!,
  farmInput: process.env.RAZZLE_FARM_INPUT! === WRAP_TOKEN_GRANADA_TESTNET.contractAddress ? WRAP_TOKEN_GRANADA_TESTNET : WRAP_TOKEN_MAINNET,
  etherscanLink: process.env.RAZZLE_ETHERSCAN_LINK!,
  liquidityMiningPrograms: liquidityMiningPrograms[env],
  oldLiquidityMiningPrograms: oldLiquidityMiningPrograms[env]
};

render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <ConfigProvider initConfig={initConfig}>
            <TezosWalletProvider name={'Wrap Protocol'}>
              <EthereumWalletProvider>
                <BrowserRouter>
                  <ResponsiveDrawer>
                    <App />
                  </ResponsiveDrawer>
                </BrowserRouter>
              </EthereumWalletProvider>
            </TezosWalletProvider>
          </ConfigProvider>
          <ToastContainer
            position='bottom-left'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme='colored'
          />
        </Web3ReactProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
