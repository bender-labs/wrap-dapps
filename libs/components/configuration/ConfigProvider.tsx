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

      const farms = feesFarmingConfiguration.contracts.filter(contract => !contract.old).reduce(
        (validFarms: FarmConfig[], farmConfiguration) => {
          const tokenInfos = indexerConfig.tokens.find(
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
        const tokenInfos = indexerConfig.tokens.find(
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
