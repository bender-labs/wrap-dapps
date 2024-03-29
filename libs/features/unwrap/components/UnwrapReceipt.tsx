import { OperationStatusType, UnwrapErc20Operation } from '../../operations/';
import {
  CircularProgressWithLabel,
  EthereumState,
  EthereumStateType,
  LabelAndAsset,
  LabelAndValue,
  LoadableButton,
  PaperActions,
  PaperContent,
  PaperHeader,
  PaperNav,
  PaperTitle,
  useEthereumWalletContext
} from '@wrap-dapps/components';
import React, { useMemo } from 'react';
import { Container, Typography } from '@mui/material';
import { ReceiptStatus } from '../../operations';
import { FungibleToken } from '@wrap-dapps/api';

export type UnwrapReceiptProps = {
  operation: UnwrapErc20Operation;
  tokens: Record<string, FungibleToken>;
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
  status: ReceiptStatus,
  ethereumState: EthereumState
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
          {ethereumState.type === EthereumStateType.CONNECTED ?
            <LoadableButton
              variant={'contained'}
              disabled={false}
              loading={status === ReceiptStatus.WAITING_FOR_APPLY}
              onClick={onRelease}
              text={'Release'}
            />
            :
            <Typography sx={{ display: 'flex', textAlign: 'center' }} p={2}>Please connect your Ethereum wallet to
              release this token</Typography>
          }
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
  const { state: ethereumState } = useEthereumWalletContext();
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

  const { decimals, ethereumSymbol, tezosSymbol } = tokensByEthAddress[
    operation.token.toLowerCase()
    ];
  return (
    <Container maxWidth='xs' sx={{ paddingTop: 3 }}>
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
            status,
            ethereumState
          )}
        </div>
      </PaperContent>
      <PaperContent
        style={{ minHeight: '160px', borderRadius: '0 0 10px 10px' }}
      />
    </Container>
  );
}
