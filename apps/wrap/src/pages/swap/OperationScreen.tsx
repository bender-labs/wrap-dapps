import React from 'react';
import { useParams } from 'react-router-dom';
import { OperationType, UnwrapReceipt, useOperation, WrapReceipt } from '@wrap-dapps/features';

export type OperationScreenProps = {
  type: OperationType;
};

export default function OperationScreen({ type }: OperationScreenProps) {
  const { transactionHash } = useParams() as { transactionHash: string };

  const {
    state,
    fungibleTokens,
    mintErc20,
    unlockErc20,
    signaturesThreshold: {
      wrap: wrapSignaturesThreshold,
      unwrap: unwrapSignaturesThreshold
    }
  } = useOperation(transactionHash, type);
  const { operation, status } = state;
  if (!operation) {
    return <div>Loading</div>;
  }
  switch (operation?.type) {
    case OperationType.WRAP:
      return (
        <WrapReceipt
          status={status}
          signaturesThreshold={wrapSignaturesThreshold}
          operation={operation}
          tokens={fungibleTokens}
          onMint={mintErc20}
        />
      );
    case OperationType.UNWRAP:
      return (
        <UnwrapReceipt
          status={status}
          signaturesThreshold={unwrapSignaturesThreshold}
          operation={operation}
          tokens={fungibleTokens}
          onRelease={unlockErc20}
        />
      );
  }
  return <></>;
}
