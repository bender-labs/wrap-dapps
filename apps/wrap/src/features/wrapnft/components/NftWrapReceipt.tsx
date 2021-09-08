import React, { useMemo } from 'react';
import { Container, Typography } from '@mui/material';
import {
  CircularProgressWithLabel,
  LabelAndAsset,
  LabelAndValue,
  LoadableButton,
  PaperActions,
  PaperContent,
  PaperHeader,
  PaperNav,
  PaperTitle,
  useConfig
} from '@wrap-dapps/components';
import { OperationStatusType, ReceiptStatus, WrapERC721Operation } from '@wrap-dapps/features';
import { NonFungibleToken } from '@wrap-dapps/api';

export type NftWrapReceiptProps = {
  operation: WrapERC721Operation;
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

function wrapStatus(
  operation: WrapERC721Operation,
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

export default function NftWrapReceipt({ operation, onMint, status, signaturesThreshold }: NftWrapReceiptProps) {
  const { nonFungibleTokens } = useConfig();

  const nftByEthAddress = useMemo(
    () =>
      Object.entries(nonFungibleTokens).reduce<Record<string, NonFungibleToken>>(
        (acc, [, metadata]) => {
          acc[metadata.ethereumContractAddress] = metadata;
          return acc;
        },
        {}
      ),
    [nonFungibleTokens]
  );

  const { ethereumName } = nftByEthAddress[
    operation.token.toLowerCase()
    ];

  return (
    <Container maxWidth='xs' sx={{ paddingTop: 3 }}>
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
          value={ethereumName + ' #' + operation.tokenId}
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
          {wrapStatus(
            operation,
            signaturesThreshold,
            onMint,
            status
          )}
        </div>
      </PaperContent>
      <PaperContent
        style={{ borderRadius: '0 0 10px 10px' }}
      />
    </Container>
  );
}
