import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { hydrate } from 'react-dom';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider, EthereumWalletProvider, TezosWalletProvider, ThemeProvider } from '@wrap-dapps/components';
import './main.css';
import { NetworkType } from '@airgap/beacon-sdk';

function getLibrary(provider: ExternalProvider): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const initConfig = {
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

hydrate(
  <ThemeProvider>
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ConfigProvider initConfig={initConfig}>
          <TezosWalletProvider name={'Benderlabs NFT Bridge'}>
            <EthereumWalletProvider>
              <App />
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
        />
      </Web3ReactProvider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
