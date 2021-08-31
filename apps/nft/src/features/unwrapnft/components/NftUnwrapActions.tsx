import React from 'react';
import { LoadableButton } from '@wrap-dapps/components';
import { NftUnwrapStatus } from '../hooks/reducer';

export type UnwrapActionsProp = {
  onUnwrap: () => void;
  status: NftUnwrapStatus;
};

export function NftUnwrapActions({ status, onUnwrap }: UnwrapActionsProp) {
  return (
    <div style={{ borderRadius: '0 0 10px 10px', backgroundColor: '#e5e5e5' }}>
      <LoadableButton
        loading={status === NftUnwrapStatus.WAITING_FOR_UNWRAP}
        variant={'contained'}
        onClick={onUnwrap}
        disabled={status !== NftUnwrapStatus.READY_TO_UNWRAP}
        text={'Wrap'}
      />
    </div>
  );
}
