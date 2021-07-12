import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { hydrate } from 'react-dom';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@wrap-dapps/components';

function getLibrary(provider: ExternalProvider): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

hydrate(
  <ThemeProvider>
    <BrowserRouter>
      <CssBaseline />
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
        <ToastContainer
          position="bottom-left"
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
