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
  DisplayEnvironment,
  EthereumWalletProvider,
  InitialConfig,
  NavBar,
  TezosWalletProvider,
  ThemeProvider
} from '@wrap-dapps/components';
import './main.css';
import { NetworkType } from '@airgap/beacon-sdk';
import { routes } from './pages/routes';
import { RecoilRoot } from 'recoil';

function getLibrary(provider: ExternalProvider): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

interface FarmStakedToken {
  contractAddress: string;
  thumbnailUri: string;
  tokenId: number;
  symbol: string;
  name: string;
  decimals: number;
}

const WRAP_MAINNET: FarmStakedToken = {
  contractAddress: 'KT1LRboPna9yQY9BrjtQYDS1DVxhKESK4VVd',
  thumbnailUri: 'ipfs://Qma2o69VRZe8aPsuCUN1VRUE5k67vw2mFDXb35uDkqn17o',
  decimals: 8,
  symbol: 'WRAP',
  name: 'WRAP',
  tokenId: 0
};

const WRAP_GRANADA_TESTNET: FarmStakedToken = {
  contractAddress: 'KT1M6RSfdbWL6RH5tPdxekrZhtXUh67x2N9Y',
  thumbnailUri: 'ipfs://Qma2o69VRZe8aPsuCUN1VRUE5k67vw2mFDXb35uDkqn17o',
  decimals: 8,
  symbol: 'WRAP',
  name: 'WRAP',
  tokenId: 0
};

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
  farmInput: process.env.RAZZLE_FARM_INPUT! === WRAP_GRANADA_TESTNET.contractAddress ? WRAP_GRANADA_TESTNET : WRAP_MAINNET
};

render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <ConfigProvider initConfig={initConfig}>
            <TezosWalletProvider name={'Benderlabs NFT Bridge'}>
              <EthereumWalletProvider>
                <BrowserRouter>
                  <NavBar routes={routes} showEthereumWallet={true} showTezosWallet={true}
                          showOperationHistory={true} />
                  <App />
                  <DisplayEnvironment />
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
