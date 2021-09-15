import { useParams } from 'react-router-dom';
import { OperationType, useOperation } from '@wrap-dapps/features';
import React from 'react';
import NftUnwrapReceipt from '../../features/unwrap_nft/components/NftUnwrapReceipt';

export default function NftUnwrapOperationScreen() {
  const { transactionHash } = useParams() as { transactionHash: string };

  const {
    state,
    unlockErc721,
    signaturesThreshold: {
      wrap: wrapSignaturesThreshold
    }
  } = useOperation(transactionHash, OperationType.UNWRAP_NFT);
  const { operation, status } = state;

  if (operation && operation.type === OperationType.UNWRAP_NFT) {
    return (
      <NftUnwrapReceipt
        status={status}
        signaturesThreshold={wrapSignaturesThreshold}
        operation={operation}
        onMint={unlockErc721}
      />
    );
  } else {
    return (<div>Loading ...</div>);
  }
}
