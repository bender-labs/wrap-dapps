import { PaperActions, PaperHeader, PaperNav, PaperTitle } from '@wrap-dapps/components';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { useHistory } from 'react-router';

export default function FarmingContractHeader({ title, path }: {
  title: string;
  path: string;
}) {
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
        {title}
      </PaperTitle>
      <PaperActions />
    </PaperHeader>
  );
}
