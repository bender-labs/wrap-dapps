import { useParams } from 'react-router-dom';
import { OperationType, useOperation } from '@wrap-dapps/features';
import React from 'react';
import NftWrapReceipt from '../../features/wrapnft/components/NftWrapReceipt';

export default function NftWrapOperationScreen() {
  const { transactionHash } = useParams() as { transactionHash: string };

  const {
    state,
    mintErc721,
    signaturesThreshold: {
      wrap: wrapSignaturesThreshold
    }
  } = useOperation(transactionHash, OperationType.WRAP_NFT);
  const { operation, status } = state;

  if (operation && operation.type === OperationType.WRAP_NFT) {
    return (
      <NftWrapReceipt
        status={status}
        signaturesThreshold={wrapSignaturesThreshold}
        operation={operation}
        onMint={mintErc721}
      />
    );
  } else {
    return (<div>Loading ...</div>);
  }
}
