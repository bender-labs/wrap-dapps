import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { TezosWalletProvider } from '@wrap-dapps/components/wallet/tezos/useTezosWallet';
import { useNotify } from '@wrap-dapps/components/notification/useNotify';
import { SnackbarProvider } from 'notistack';

function InnerContainer({ Component, pageProps }: AppProps) {
  const notify = useNotify();
  return (
    <TezosWalletProvider name={'Wonderful Dapp'} notify={notify}>
      <Component {...pageProps} />
    </TezosWalletProvider>
  );
}

function MyApp(props: AppProps) {
  return (
    <SnackbarProvider>
      <InnerContainer {...props} />
    </SnackbarProvider>
  );
}

export default MyApp;
