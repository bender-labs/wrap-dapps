import { OperationHistoryButton, PaperContent, useConfig } from '@wrap-dapps/components';
import { usePendingOperationsHistory } from '../hooks/';
import React, { ReactNode, useMemo, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  styled,
  Typography
} from '@material-ui/core';
import { Operation, OperationStatusType, UnwrapErc20Operation, WrapErc20Operation } from '../state';
import { formatAmount } from '../../ethereum/';
import { ellipsizeAddress } from '../../wallet/address';
import { FungibleToken } from '@wrap-dapps/api';

const StyledListItem = styled(() => <ListItem button />)(() => ({
  textAlign: 'center',
  backgroundColor: '#191919',
  color: 'white',
  '&:hover': {
    backgroundColor: '#4d4d4d'
  }
}));

const StyledPaperContent = styled(PaperContent)(() => ({
  textAlign: 'center',
  backgroundColor: '#191919',
  color: 'white',
  '&:hover': {
    backgroundColor: '#4d4d4d'
  }
}));

const StyledDivider = styled(Divider)(() => ({
  backgroundColor: '#444444'
}));

const StyledTypography = styled(() => <Typography component='p' variant={'body2'} />)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700
}));

const StyledDialogTitle = styled(DialogTitle)(() => ({
  backgroundColor: '#191919',
  color: '#FFFFFF',
  fontSize: 20,
  fontWeight: 700,
  textAlign: 'center'
}));

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  textAlign: 'center',
  fontWeight: 'bold'
}));

export default function OperationHistoryDialog() {
  const {
    operations,
    count,
    canFetch,
    selectOperation
  } = usePendingOperationsHistory();
  const [open, setOpen] = useState(false);
  const {
    fungibleTokens,
    wrapSignatureThreshold,
    unwrapSignatureThreshold
  } = useConfig();

  const gotoOp = (op: Operation) => {
    selectOperation(op);
    setOpen(false);
  };

  const tokensByEthAddress = useMemo(
    () =>
      Object.entries(fungibleTokens).reduce<Record<string, FungibleToken>>(
        (acc, [, metadata]) => {
          acc[metadata.ethereumContractAddress] = metadata;
          return acc;
        },
        {}
      ),
    [fungibleTokens]
  );

  const renderItem = (
    operation: Operation,
    primary: string,
    secondary: string | ReactNode,
    isLast: boolean
  ) => {
    return (
      <React.Fragment key={operation.hash}>
        <StyledListItem onClick={(e) => {
          e.preventDefault();
          gotoOp(operation);
        }}
        >
          <ListItemText
            primaryTypographyProps={{ variant: 'body2' }}
            primary={primary}
            secondary={secondary}
          />
        </StyledListItem>
        {!isLast && <StyledDivider />}
      </React.Fragment>
    );
  };

  const renderMint = (operation: WrapErc20Operation, isLast: boolean) => {
    const primaryText = () => {
      const { decimals, ethereumSymbol } = tokensByEthAddress[
        operation.token.toLowerCase()
        ];
      return `mint ${formatAmount(
        ethereumSymbol,
        operation.amount.minus(operation.fees),
        decimals
      )} to ${ellipsizeAddress(operation.destination)}`;
    };

    const secondaryText = () => {
      switch (operation.status.type) {
        case OperationStatusType.NEW:
          return (
            <StyledTypography>
              Waiting for operation to be included
            </StyledTypography>
          );
        case OperationStatusType.WAITING_FOR_CONFIRMATIONS:
          return (
            <StyledTypography>
              Pending... {operation.status.confirmations} /{' '}
              {operation.status.confirmationsThreshold} confirmations
            </StyledTypography>
          );
        case OperationStatusType.WAITING_FOR_SIGNATURES:
          return (
            <React.Fragment>
              <StyledTypography>
                Waiting for signatures
              </StyledTypography>
              <StyledTypography>
                {`(${
                  Object.keys(operation.status.signatures).length
                }/${wrapSignatureThreshold} signatures received)`}
              </StyledTypography>
            </React.Fragment>
          );
        case OperationStatusType.READY:
          return (
            <StyledTypography>
              Ready to mint
            </StyledTypography>
          );
      }
    };

    return renderItem(operation, primaryText(), secondaryText(), isLast);
  };

  const renderBurn = (operation: UnwrapErc20Operation, isLast: boolean) => {
    const primaryText = () => {
      const { decimals, ethereumSymbol } = tokensByEthAddress[
        operation.token.toLowerCase()
        ];
      return `release ${formatAmount(
        ethereumSymbol,
        operation.amount,
        decimals
      )} to ${ellipsizeAddress(operation.destination)}`;
    };

    const secondaryText = () => {
      switch (operation.status.type) {
        case OperationStatusType.NEW:
          return (
            <StyledTypography>
              Waiting for operation to be included
            </StyledTypography>
          );
        case OperationStatusType.WAITING_FOR_CONFIRMATIONS:
          return (
            <StyledTypography>
              Pending... {operation.status.confirmations} /{' '}
              {operation.status.confirmationsThreshold} confirmations
            </StyledTypography>
          );
        case OperationStatusType.WAITING_FOR_SIGNATURES:
          return (
            <React.Fragment>
              <StyledTypography>
                Waiting for signatures
              </StyledTypography>
              <StyledTypography>
                {`(${
                  Object.keys(operation.status.signatures).length
                }/${unwrapSignatureThreshold} signatures received)`}
              </StyledTypography>
            </React.Fragment>
          );
        case OperationStatusType.READY:
          return (
            <StyledTypography>
              Ready to release
            </StyledTypography>
          );
      }
    };

    return renderItem(operation, primaryText(), secondaryText(), isLast);
  };

  return (
    <>
      <OperationHistoryButton
        count={count}
        onClick={() => {
          setOpen(!open);
        }}
      />
      <Dialog open={open} onBackdropClick={() => setOpen(false)} fullWidth>
        <StyledDialogTitle>
          Pending operations
        </StyledDialogTitle>
        {!canFetch && (
          <StyledPaperContent>
            <Typography variant={'body1'}>
              Please connect to at least one wallet to see your pending
              operations
            </Typography>
          </StyledPaperContent>
        )}
        {canFetch && (
          <List style={{ padding: '0px' }}>
            <StyledListSubheader>
              Minting operations
            </StyledListSubheader>
            {operations.mints.map((o, i) =>
              renderMint(o, i === operations.mints.length - 1)
            )}
            {operations.mints.length === 0 && (
              <StyledListItem>
                <ListItemText>No pending minting operation</ListItemText>
              </StyledListItem>
            )}
            <StyledListSubheader>
              Release operations
            </StyledListSubheader>
            {operations.burns.map((o, i) =>
              renderBurn(o, i === operations.burns.length - 1)
            )}
            {operations.burns.length === 0 && (
              <StyledListItem>
                <ListItemText>No pending release operation</ListItemText>
              </StyledListItem>
            )}
          </List>
        )}
      </Dialog>
    </>
  );
}
