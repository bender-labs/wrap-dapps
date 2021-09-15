import React from 'react';
import { LoadableButton } from '@wrap-dapps/components';
import { Box } from '@mui/material';

export type NftTransferActionProp = {
  onTransfer: () => void;
  loading: boolean;
  ready: boolean;
};

export function NftTransferAction({ loading, ready, onTransfer }: NftTransferActionProp) {
  return (
    <Box sx={{ borderRadius: '0 0 10px 10px', backgroundColor: '#e5e5e5', padding: 2 }}>
      <LoadableButton
        loading={loading}
        variant={'contained'}
        onClick={onTransfer}
        disabled={!ready}
        text={'Transfer'}
      />
    </Box>
  );
}
