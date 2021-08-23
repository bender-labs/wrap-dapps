import { OperationStatusType, UnwrapErc20Operation } from '../../operations/';
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
import { TokenMetadata } from '../../swap';
import { Typography } from '@material-ui/core';
import { ReceiptStatus } from '../../operations/hooks/reducer';

export type UnwrapReceiptProps = {
  operation: UnwrapErc20Operation;
  tokens: Record<string, TokenMetadata>;
  signaturesThreshold: number;
  status: ReceiptStatus;
  onRelease: () => void;
};

function label(value: string) {
  return (
    <Typography variant='caption' component='div'>
      {value}
    </Typography>
  );
}

function unwrapStatus(
  operation: UnwrapErc20Operation,
  signaturesThreshold: number,
  onRelease: () => any,
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
            onClick={onRelease}
            text={'Release'}
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

export default function UnwrapReceipt({
                                        operation,
                                        tokens,
                                        signaturesThreshold,
                                        status,
                                        onRelease
                                      }: UnwrapReceiptProps) {
  const tokensByEthAddress = useMemo(
    () =>
      Object.entries(tokens).reduce<Record<string, TokenMetadata>>(
        (acc, [, metadata]) => {
          acc[metadata.ethereumContractAddress] = metadata;
          return acc;
        },
        {}
      ),
    [tokens]
  );

  const { decimals, ethereumSymbol, tezosSymbol } = tokensByEthAddress[
    operation.token.toLowerCase()
    ];
  return (
    <>
      <PaperHeader extraPadding>
        <PaperNav />
        <PaperTitle>Releasing</PaperTitle>
        <PaperActions />
      </PaperHeader>
      <PaperContent>
        <LabelAndValue
          label={'Recipient address'}
          value={operation.destination}
        />
        <LabelAndAsset
          label={'Receive'}
          value={operation.amount}
          symbol={ethereumSymbol}
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
          {unwrapStatus(
            operation,
            signaturesThreshold,
            onRelease,
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
