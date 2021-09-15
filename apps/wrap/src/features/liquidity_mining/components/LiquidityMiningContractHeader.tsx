import React from 'react';
import { useHistory } from 'react-router';
import { PaperActions, PaperHeader, PaperNav, PaperTitle, ProgramConfig } from '@wrap-dapps/components';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { paths } from '../../../pages/routes';

export function LiquidityMiningContractHeader({ program }: {
  program: ProgramConfig;
}) {
  const history = useHistory();
  return (
    <PaperHeader>
      <PaperNav>
        <IconButton
          onClick={() => {
            history.push(paths.LIQUIDITY_MINING_ROOT);
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </PaperNav>
      <PaperTitle>
        Quipuswap {program.pool.base.symbol}/{program.pool.quote.toUpperCase()}
      </PaperTitle>
      <PaperActions />
    </PaperHeader>
  );
}
