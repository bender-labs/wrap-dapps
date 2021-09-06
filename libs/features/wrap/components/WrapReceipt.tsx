import { OperationStatusType, ReceiptStatus, WrapErc20Operation } from '../../operations';
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
import React, { useMemo } from 'react';
import { Container, Typography } from '@material-ui/core';
import { FungibleToken } from '@wrap-dapps/api';

export type WrapReceiptProps = {
  operation: WrapErc20Operation;
  status: ReceiptStatus;
  signaturesThreshold: number;
  tokens: Record<string, FungibleToken>;
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
  operation: WrapErc20Operation,
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

export default function WrapReceipt({
                                      operation,
                                      tokens,
                                      onMint,
                                      status,
                                      signaturesThreshold
                                    }: WrapReceiptProps) {
  const tokensByEthAddress = useMemo(
    () =>
      Object.entries(tokens).reduce<Record<string, FungibleToken>>(
        (acc, [, metadata]) => {
          acc[metadata.ethereumContractAddress] = metadata;
          return acc;
        },
        {}
      ),
    [tokens]
  );

  const { decimals, tezosSymbol } = tokensByEthAddress[
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
        <LabelAndAsset
          label={'Receive'}
          value={operation.amount.minus(operation.fees)}
          symbol={tezosSymbol}
          decimals={decimals}
        />
        <LabelAndAsset
          label={'Protocol fees'}
          value={operation.fees}
          symbol={tezosSymbol}
          decimals={decimals}
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
        style={{ minHeight: '160px', borderRadius: '0 0 10px 10px' }}
      />
    </Container>
  );
}
