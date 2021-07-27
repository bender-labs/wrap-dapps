import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Config, initialConfig } from './types';
import { createIndexerApi, FungibleToken, TokenType } from '@wrap-dapps/api';
import { Box, Typography } from '@material-ui/core';

type ContextValue = undefined | Config;
const ConfigContext = React.createContext<ContextValue>(undefined);

export function useConfig() {
  const config = React.useContext(ConfigContext);
  if (config == null)
    throw new Error('config consumer must be used within a config provider');
  return config;
}

export function useIndexerApi() {
  const { indexerUrl } = useConfig();
  return useMemo(() => createIndexerApi(indexerUrl), [indexerUrl]);
}

export function ConfigProvider({ children }: PropsWithChildren<{}>) {
  const [config, setConfig] = useState<ContextValue>();

  useEffect(() => {
    const initConfig = initialConfig;

    const indexerApi = createIndexerApi(initConfig.indexerUrl);

    const loadConfig = async () => {
      const indexerConfig = await indexerApi.getConfiguration();

      const config = {
        environmentName: initConfig.environmentName,
        indexerUrl: initConfig.indexerUrl,
        statisticsUrl: initConfig.statisticsUrl,
        ethereum: {
          ...initConfig.ethereum,
          custodianContractAddress: indexerConfig.ethereumWrapContract,
        },
        tezos: {
          ...initConfig.tezos,
          minterContractAddress: indexerConfig.tezosMinterContract,
          quorumContractAddress: indexerConfig.tezosQuorumContract,
        },
        wrapSignatureThreshold: indexerConfig.wrapRequiredSignatures,
        unwrapSignatureThreshold: indexerConfig.unwrapRequiredSignatures,
        fungibleTokens: indexerConfig.tokens
          .filter((t) => t.type === TokenType.ERC20)
          .reduce<Record<string, FungibleToken>>((acc, e) => {
            if (e.type !== TokenType.ERC20) {
              return acc;
            }
            acc[e.ethereumSymbol] = e;
            return acc;
          }, {}),
      };
      setConfig(config);
    };
    // noinspection JSIgnoredPromiseFromCall
    loadConfig();
  }, []);

  return (
    <>
      {!config ? (
        <Box>
          <Typography variant={'h1'}>Loading</Typography>
        </Box>
      ) : (
        <ConfigContext.Provider value={config}>
          {children}
        </ConfigContext.Provider>
      )}
    </>
  );
}
