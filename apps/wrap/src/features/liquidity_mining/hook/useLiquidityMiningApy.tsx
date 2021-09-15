import { useEffect, useMemo, useState } from 'react';
import { LiquidityMiningApy, StatisticsApi } from '@wrap-dapps/api';
import { useConfig } from '@wrap-dapps/components';

export function useLiquidityMiningApy() {
  const [liquidityMiningApys, setLiquidityMiningApys] = useState<Array<LiquidityMiningApy>>();
  const { statisticsUrl } = useConfig();
  const api = useMemo(() => new StatisticsApi(statisticsUrl), [statisticsUrl]);

  useEffect(() => {
    const loadLiquidityMiningApy = async () => {
      const liquidityMiningContracts = await api.fetchLiquidityMiningApy();
      for (const liquidityMiningContract of liquidityMiningContracts) {
        if (!liquidityMiningContract.running) {
          liquidityMiningContract.apy = '0';
          liquidityMiningContract.apr = '0';
          liquidityMiningContract.totalRewardsPerDay = '0';
          liquidityMiningContract.totalRewardsPerDayInUsd = '0';
        }
      }
      setLiquidityMiningApys(liquidityMiningContracts);
    };
    // noinspection JSIgnoredPromiseFromCall
    loadLiquidityMiningApy();
  }, [api]);

  return {
    liquidityMiningApys
  };
}