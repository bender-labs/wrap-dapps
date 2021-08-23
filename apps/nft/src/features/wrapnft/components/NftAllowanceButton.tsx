import React from 'react';
import { LoadableButton } from '@wrap-dapps/components';

type Props = {
  isAllowed: boolean;
  onAuthorize: () => void;
  loading: boolean;
  enabled?: boolean;
};

export function NftAllowanceButton({
                                     isAllowed,
                                     onAuthorize,
                                     loading,
                                     enabled = true
                                   }: Props) {
  const { finalized, text } = isAllowed
    ? {
      finalized: true,
      text: 'Allowed'
    }
    : {
      finalized: false,
      text: 'Allow'
    };

  return (
    <LoadableButton
      loading={loading}
      onClick={onAuthorize}
      disabled={!enabled}
      text={text}
      finalized={finalized}
    />
  );
}
