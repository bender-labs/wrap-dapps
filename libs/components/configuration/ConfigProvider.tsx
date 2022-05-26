import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Config, FarmConfig, InitialConfig, StackingConfig } from './types';
import {
  FungibleToken,
  IndexerApi,
  IndexerFeesFarmConfigurationPayload,
  NonFungibleToken,
  StatisticsApi,
  TokenType
} from '@wrap-dapps/api';
import { LoadingScreen } from './LoadingScreen';

type UpdateRpc = (url: string) => void;
type ContextValue = undefined | Config;
type UpdateRpcValue = undefined | UpdateRpc;
const ConfigContext = React.createContext<{config: ContextValue, updateRpcNode: UpdateRpcValue}>({ config: undefined, updateRpcNode: undefined  } );

export function useConfig() {
  const { config } = React.useContext(ConfigContext);
  if (config == null)
    throw new Error('config consumer must be used within a config provider');
  return config;
}

export function useRpcNodeUpdate() {
  const { updateRpcNode }  = React.useContext(ConfigContext);
  if (updateRpcNode == null)
    throw new Error('config consumer must be used within a config provider');
  return updateRpcNode;
}

export function useTezosConfig() {
  const { tezos } = useConfig();
  return tezos;
}

export function useEthereumConfig() {
  const { ethereum } = useConfig();
  return ethereum;
}

export function useNonFungibleTokens() {
  const { nonFungibleTokens } = useConfig();
  return nonFungibleTokens;
}

export function useIndexerApi() {
  const { indexerUrl } = useConfig();
  return useMemo(() => new IndexerApi(indexerUrl), [indexerUrl]);
}

const getTimeFromRetryCounter = (counter: number) => Math.pow(2, counter) - 1;

const stoppedFarms: IndexerFeesFarmConfigurationPayload[] =
  [
    {
      rewards: undefined,
      maxLevelProcessed: 0,
      totalStaked: '0',
      contract: 'KT1SZVLvLDQvqx6qMbF8oXZe2tfP7bJMASy2',
      token: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
      tokenId: '19',
      old: true
    },
    {
      rewards: undefined,
      maxLevelProcessed: 0,
      totalStaked: '0',
      contract: 'KT1AnsHEdYKEdM62QCNpZGc5PfpXhftcdu22',
      token: 'KT1LRboPna9yQY9BrjtQYDS1DVxhKESK4VVd',
      tokenId: '0',
      old: true
    }
  ];

export enum ConfigStatus {
  UNINITIALIZED,
  LOADING,
  LOADED,
}

type Props = {
  initConfig: InitialConfig
}

export function ConfigProvider({ children, initConfig }: PropsWithChildren<Props>) {
  const [configStatus, setConfigStatus] = useState<ConfigStatus>(
    ConfigStatus.UNINITIALIZED
  );
  const [config, setConfig] = useState<ContextValue>();
  const [retryTime, setRetryTime] = useState<number>(0);
  const localConfigKey = `wrap-config-${initConfig.environmentName}`;

  const updateRpcNode = (url: string) => {
    const newConfig: Config = {
      ...config!,
      tezos: {
        rpcUrl: url,
        networkId: config?.tezos.networkId,
        networkName: config?.tezos.networkName,
        minterContractAddress: config?.tezos.minterContractAddress,
        quorumContractAddress: config?.tezos.quorumContractAddress
      }
    };
    setConfig(newConfig);
    localStorage.setItem(localConfigKey, JSON.stringify(newConfig));
  };

  useEffect(() => {
    setConfigStatus(ConfigStatus.LOADING);
    const localConfig = localStorage.getItem(localConfigKey);
    let loadedConfig: Config;

    if (localConfig != null) {
      loadedConfig = JSON.parse(localConfig);
      if (!loadedConfig.rpcNodes) {
        loadedConfig.rpcNodes = initConfig.rpcNodes;
        loadedConfig.tezos.rpcUrl = initConfig.rpcNodes[0].url;
      }
      setConfig(loadedConfig);
      setConfigStatus(ConfigStatus.LOADED);
    }

    const indexerApi = new IndexerApi(initConfig.indexerUrl);
    const statisticsApi = new StatisticsApi(initConfig.statisticsUrl);

    const loadConfig = async () => {
      const indexerConfig = await indexerApi.getConfiguration();
      const feesFarmingConfiguration = await indexerApi.fetchFeesFarmingConfiguration();
      const wrapStackingConfiguration = await indexerApi.fetchWrapStackingConfiguration();
      const feesStakingApies = await statisticsApi.fetchFeesStakingApy();
      const wrapStackingApies = await statisticsApi.fetchWrapStackingApy();
      const farmTokens = indexerConfig.tokens.concat([
        {
          'type': TokenType.ERC20,
          'ethereumSymbol': "USDT",
          "ethereumName": "Tether USD",
          "ethereumContractAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "decimals": 6,
          "tezosWrappingContract": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
          "tezosTokenId": 18,
          "tezosSymbol": "wUSDT",
          "tezosName": "Wrapped USDT",
          "thumbnailUri": "ipfs://QmVbiHa37pe2U9FfXBYfvrLNpb38rbXwaN19HwZD2speFA"
        },
        {
          "type": TokenType.ERC20,
          "ethereumSymbol": "USDC",
          "ethereumName": "USD Coin",
          "ethereumContractAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "decimals": 6,
          "tezosWrappingContract": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
          "tezosTokenId": 17,
          "tezosSymbol": "wUSDC",
          "tezosName": "Wrapped USDC",
          "thumbnailUri": "ipfs://QmQfHU9mYLRDU4yh2ihm3zrvVFxDrLPiXNYtMovUQE2S2t"
        },
        {
          "type": TokenType.ERC20,
          "ethereumSymbol": "BUSD",
          "ethereumName": "Binance USD",
          "ethereumContractAddress": "0x4fabb145d64652a948d72533023f6e7a623c7c53",
          "decimals": 18,
          "tezosWrappingContract": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
          "tezosTokenId": 1,
          "tezosSymbol": "wBUSD",
          "tezosName": "Wrapped BUSD",
          "thumbnailUri": "ipfs://QmRB63vb8ThpmxHKF4An3XD8unHyCUuLYm5bZNhXwU4gAZ"
        },
        {
          "type": TokenType.ERC20,
          "ethereumSymbol": "WBTC",
          "ethereumName": "Wrapped BTC",
          "ethereumContractAddress": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
          "decimals": 8,
          "tezosWrappingContract": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
          "tezosTokenId": 19,
          "tezosSymbol": "wWBTC",
          "tezosName": "Wrapped WBTC",
          "thumbnailUri": "ipfs://Qmdj6n9T48LDWex8NkBMKUQJfZgardxZVdtRRibYQVzLCJ"
        },
        {
          "type": TokenType.ERC20,
          "ethereumSymbol": "WETH",
          "ethereumName": "Wrapped Ether",
          "ethereumContractAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          "decimals": 18,
          "tezosWrappingContract": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
          "tezosTokenId": 20,
          "tezosSymbol": "wWETH",
          "tezosName": "Wrapped WETH",
          "thumbnailUri": "ipfs://Qmezz1ztvo5JFshHupBEdUzVppyMfJH6K4kPjQRSZp8cLq"
        },
        {
          "type": TokenType.ERC20,
          "ethereumSymbol": "MATIC",
          "ethereumName": "Matic Token",
          "ethereumContractAddress": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
          "decimals": 18,
          "tezosWrappingContract": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
          "tezosTokenId": 11,
          "tezosSymbol": "wMATIC",
          "tezosName": "Wrapped MATIC",
          "thumbnailUri": "ipfs://QmchBnjRjpweznHes7bVKHwgzd8D6Q7Yzwf6KmA4KS6Dgi"
        },
        {
          "type": TokenType.ERC20,
          "ethereumSymbol": "DAI",
          "ethereumName": "Dai Stablecoin",
          "ethereumContractAddress": "0x6b175474e89094c44da98b954eedeac495271d0f",
          "decimals": 18,
          "tezosWrappingContract": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
          "tezosTokenId": 5,
          "tezosSymbol": "wDAI",
          "tezosName": "Wrapped DAI",
          "thumbnailUri": "ipfs://QmVov6RtfRNzuQGvGKmhnABUsfCiDKvn31amg8DUxzowtM"
        },
        {
          "type": TokenType.ERC20,
          "ethereumSymbol": "LINK",
          "ethereumName": "ChainLink Token",
          "ethereumContractAddress": "0x514910771af9ca656af840dff83e8264ecf986ca",
          "decimals": 18,
          "tezosWrappingContract": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
          "tezosTokenId": 10,
          "tezosSymbol": "wLINK",
          "tezosName": "Wrapped LINK",
          "thumbnailUri": "ipfs://QmeaRuB578Xgy8jxbTxqmQ9s5wyioAEP85V7qbJFnn2uT8"
        },
      ]);
      const farms = feesFarmingConfiguration.contracts.filter(contract => !contract.old).reduce(
        (validFarms: FarmConfig[], farmConfiguration) => {
          console.log(farmConfiguration);
          const tokenInfos = farmTokens.find(
            (t) =>
              t.tezosWrappingContract === farmConfiguration.token &&
              t.tezosTokenId.toString() === farmConfiguration.tokenId
          );
          if (tokenInfos) {
            const tokenMedata = tokenInfos as FungibleToken;
            const apy = feesStakingApies.find(s => s.farmingContract === farmConfiguration.contract);
            validFarms.push({
              maxTotalStakedLevelProcessed: farmConfiguration.maxLevelProcessed,
              farmContractAddress: farmConfiguration.contract,
              farmContractLink:
                initConfig.tzktLink + farmConfiguration.contract,
              farmTotalStaked: farmConfiguration.totalStaked ?? '0',
              farmStakedToken: initConfig.farmInput,
              rewardTokenName: tokenMedata.tezosName,
              rewardTokenThumbnailUri: tokenMedata.thumbnailUri ?? '',
              rewardTokenContractAddress: farmConfiguration.token,
              rewardTokenId: parseInt(farmConfiguration.tokenId),
              rewardTokenDecimals: tokenMedata.decimals,
              rewardTokenSymbol: tokenMedata.tezosSymbol,
              rewards: farmConfiguration.rewards,
              apy: apy ? parseFloat(apy.apy).toFixed(0) : undefined,
              apr: apy ? parseFloat(apy.apr).toFixed(0) : undefined
            });
          }
          return validFarms;
        },
        []
      );

      const oldFarms = feesFarmingConfiguration.contracts.filter(contract => contract.old).concat(stoppedFarms).reduce((oldFarms: FarmConfig[], farmConfiguration) => {
        const tokenInfos = farmTokens.find(
          (t) =>
            t.tezosWrappingContract === farmConfiguration.token &&
            t.tezosTokenId.toString() === farmConfiguration.tokenId
        );
        if (tokenInfos) {
          const tokenMedata = tokenInfos as FungibleToken;
          oldFarms.push({
            maxTotalStakedLevelProcessed: 0,
            farmContractAddress: farmConfiguration.contract,
            farmContractLink: initConfig.tzktLink + farmConfiguration.contract,
            farmTotalStaked: farmConfiguration.totalStaked ?? '0',
            farmStakedToken: initConfig.farmInput,
            rewardTokenName: tokenMedata.tezosName,
            rewardTokenThumbnailUri: tokenMedata.thumbnailUri ?? '',
            rewardTokenContractAddress: farmConfiguration.token,
            rewardTokenId: parseInt(farmConfiguration.tokenId),
            rewardTokenDecimals: tokenMedata.decimals,
            rewardTokenSymbol: tokenMedata.tezosSymbol,
            rewards: undefined
          });
        }
        return oldFarms;
      }, []);

      const validStackingContracts = wrapStackingConfiguration.contracts.reduce((validStackingContracts: StackingConfig[], wrapStackingContractConfiguration) => {
        const apy = wrapStackingApies.find(s => s.farmingContract === wrapStackingContractConfiguration.contract);
        validStackingContracts.push({
          stackingContract: wrapStackingContractConfiguration.contract,
          reward: initConfig.farmInput,
          stackingContractLink: initConfig.tzktLink + wrapStackingContractConfiguration.contract + '/operations/',
          totalStaked: wrapStackingContractConfiguration.totalStaked,
          apy: apy ? parseFloat(apy.apy).toFixed(0) : undefined,
          apr: apy ? parseFloat(apy.apr).toFixed(0) : undefined,
          fees: wrapStackingContractConfiguration.fees
        });
        return validStackingContracts;
      }, []);
      const config = {
        environmentName: initConfig.environmentName,
        indexerUrl: initConfig.indexerUrl,
        statisticsUrl: initConfig.statisticsUrl,
        tzktLink: initConfig.tzktLink,
        rpcNodes: initConfig.rpcNodes,
        etherscanLink: initConfig.etherscanLink,
        ethereum: {
          ...initConfig.ethereum,
          custodianContractAddress: indexerConfig.ethereumWrapContract
        },
        tezos: {
          ...initConfig.tezos,
          rpcUrl: loadedConfig ? loadedConfig.tezos.rpcUrl : initConfig.rpcNodes[0].url,
          minterContractAddress: indexerConfig.tezosMinterContract,
          quorumContractAddress: indexerConfig.tezosQuorumContract
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
        nonFungibleTokens: indexerConfig.tokens
          .filter((t) => t.type === TokenType.ERC721)
          .reduce<Record<string, NonFungibleToken>>((acc, e) => {
            if (e.type !== TokenType.ERC721) {
              return acc;
            }
            acc[e.ethereumSymbol] = e;
            return acc;
          }, {}),
        fees: indexerConfig.fees,
        farms,
        farmInput: initConfig.farmInput,
        oldFarms,
        liquidityMiningPrograms: initConfig.liquidityMiningPrograms,
        oldLiquidityMiningPrograms: initConfig.oldLiquidityMiningPrograms,
        stacking: validStackingContracts
      };

      localStorage.setItem(localConfigKey, JSON.stringify(config));
      setConfig(config);
      setConfigStatus(ConfigStatus.LOADED);
    };

    const loadingWithRetries = async (counter = 1) => {
      try {
        await loadConfig();
      } catch (_) {
        const retrySecond = getTimeFromRetryCounter(counter);
        console.warn(`Error fetching indexer config, retry in ${retrySecond}`);
        setRetryTime(retrySecond);
        await setTimeout(
          () => loadingWithRetries(counter + 1),
          retrySecond * 1000
        );
      }
    };

    // noinspection JSIgnoredPromiseFromCall
    loadingWithRetries();
  }, []);

  return (
    <>
      {configStatus !== ConfigStatus.LOADED ? (
        <LoadingScreen retryTime={retryTime} />
      ) : (
        <ConfigContext.Provider value={{config, updateRpcNode}}>
          {children}
        </ConfigContext.Provider>
      )}
    </>
  );
}
