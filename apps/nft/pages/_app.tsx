import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { TezosWalletProvider } from '@wrap-dapps/components/wallet/tezos/useTezosWallet';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TezosWalletProvider name={'Wonderfull Dapp'}>
      <Component {...pageProps} />
    </TezosWalletProvider>
  );
}

export default MyApp;
