import React from 'react';
import { PaperActions, PaperHeader, PaperNav, PaperTitle } from '@wrap-dapps/components';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router';

export function WrapStackingContractHeader({ path }: { path: string }) {
  const history = useHistory();
  return (
    <PaperHeader>
      <PaperNav>
        <IconButton
          onClick={() => {
            history.push(path);
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </PaperNav>
      <PaperTitle>
        $WRAP Stacking
      </PaperTitle>
      <PaperActions />
    </PaperHeader>
  );
}
