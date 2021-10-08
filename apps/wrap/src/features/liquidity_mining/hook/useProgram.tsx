import { useConfig } from '@wrap-dapps/components';
import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

export function useProgram(address: string) {
  const { liquidityMiningPrograms, oldLiquidityMiningPrograms } = useConfig();
  const history = useHistory();
  const program = useMemo(() => {
    return liquidityMiningPrograms.concat(oldLiquidityMiningPrograms).find((t) => t.farmingContract === address);
  }, [address, liquidityMiningPrograms, oldLiquidityMiningPrograms]);

  useEffect(() => {
    if (!program) {
      history.push('/');
    }
  }, [history, program]);

  return { program: program! };
}
