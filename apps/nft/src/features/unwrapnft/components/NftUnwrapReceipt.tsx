import React from 'react';
import { Typography } from '@material-ui/core';
import {
  CircularProgressWithLabel,
  LabelAndAsset,
  LabelAndValue,
  LoadableButton,
  PaperActions,
  PaperContent,
  PaperHeader,
  PaperNav,
  PaperTitle
} from '@wrap-dapps/components';
import { OperationStatusType, ReceiptStatus, UnwrapERC721Operation } from '@wrap-dapps/features';

export type NftUnwrapReceiptProps = {
  operation: UnwrapERC721Operation;
  status: ReceiptStatus;
  signaturesThreshold: number;
  onMint: () => void;
};

function label(value: string) {
  return (
    <Typography variant={'caption'} component='div'>
      {value}
    </Typography>
  );
}

function unwrapNftStatus(
  operation: UnwrapERC721Operation,
  signaturesThreshold: number,
  onMint: () => any,
  status: ReceiptStatus
) {
  const step = 100 / 4;
  switch (operation.status.type) {
    case OperationStatusType.WAITING_FOR_RECEIPT:
      return (
        <CircularProgressWithLabel
          label={label('Waiting to be included...')}
          value={0}
        />
      );
    case OperationStatusType.NEW:
      return (
        <CircularProgressWithLabel
          label={label('Waiting for confirmations...')}
          value={step}
        />
      );
    case OperationStatusType.WAITING_FOR_CONFIRMATIONS:
      const value = step * 2;
      return (
        <CircularProgressWithLabel
          label={label(
            `Waiting for confirmations... (${operation.status.confirmations}/${operation.status.confirmationsThreshold})`
          )}
          value={value}
        />
      );
    case OperationStatusType.WAITING_FOR_SIGNATURES:
      const signaturesCount = Object.keys(operation.status.signatures).length;
      const sigValue = step * 3;
      return (
        <CircularProgressWithLabel
          label={label(
            `Waiting for signatures... (${signaturesCount}/${signaturesThreshold})`
          )}
          value={sigValue}
        />
      );
    case OperationStatusType.READY:
      return (
        <PaperContent>
          <LoadableButton
            variant={'contained'}
            disabled={false}
            loading={status === ReceiptStatus.WAITING_FOR_APPLY}
            onClick={onMint}
            text={'Mint'}
          />
        </PaperContent>
      );
    case OperationStatusType.DONE:
      return (
        <PaperContent>
          <LoadableButton
            variant={'contained'}
            disabled={true}
            loading={false}
            onClick={() => {
            }}
            text={'Applied'}
          />
        </PaperContent>
      );
  }
}

export default function NftUnwrapReceipt({ operation, onMint, status, signaturesThreshold }: NftUnwrapReceiptProps) {
  return (
    <>
      <PaperHeader extraPadding>
        <PaperNav />
        <PaperTitle>Minting</PaperTitle>
        <PaperActions />
      </PaperHeader>
      <PaperContent>
        <LabelAndValue
          label={'Recipient address'}
          value={operation.destination}
        />
        <LabelAndValue
          label={'Receive'}
          value={operation.tokenId}
        />
        <LabelAndAsset
          label={'Protocol fees'}
          value={operation.fees}
          symbol='XTZ'
          decimals={6}
        />
      </PaperContent>
      <PaperContent style={{ padding: '0px' }}>
        <div>
          {unwrapNftStatus(
            operation,
            signaturesThreshold,
            onMint,
            status
          )}
        </div>
      </PaperContent>
      <PaperContent
        style={{ minHeight: '160px', borderRadius: '0 0 10px 10px' }}
      />
    </>
  );
}
