import { OperationHistoryButton, PaperContent, useConfig } from '@wrap-dapps/components';
import { usePendingOperationsHistory } from '../hooks/';
import React, { ReactNode, useMemo, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemProps,
  ListItemText,
  ListSubheader,
  styled,
  Typography
} from '@mui/material';
import {
  Operation,
  OperationStatusType,
  UnwrapErc20Operation,
  UnwrapERC721Operation,
  WrapErc20Operation,
  WrapERC721Operation
} from '../state';
import { formatAmount } from '../../ethereum/';
import { ellipsizeAddress } from '../../wallet';
import { FungibleToken, NonFungibleToken } from '@wrap-dapps/api';

const StyledListItem = styled(ListItem)<ListItemProps>(() => ({
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

const StyledTypography = styled(Typography)(({ theme }) => ({
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
    nonFungibleTokens,
    wrapSignatureThreshold,
    unwrapSignatureThreshold
  } = useConfig();

  const gotoOp = (op: Operation) => {
    selectOperation(op);
    setOpen(false);
  };

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
        <StyledListItem button onClick={(e) => {
          e.preventDefault();
          gotoOp(operation);
        }}
        >
          <ListItemText
            disableTypography={true}
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
            <StyledTypography variant={'body2'}>
              Waiting for operation to be included
            </StyledTypography>
          );
        case OperationStatusType.WAITING_FOR_CONFIRMATIONS:
          return (
            <StyledTypography variant={'body2'}>
              Pending... {operation.status.confirmations} /{' '}
              {operation.status.confirmationsThreshold} confirmations
            </StyledTypography>
          );
        case OperationStatusType.WAITING_FOR_SIGNATURES:
          return (
            <React.Fragment>
              <StyledTypography variant={'body2'}>
                Waiting for signatures
              </StyledTypography>
              <StyledTypography variant={'body2'}>
                {`(${
                  Object.keys(operation.status.signatures).length
                }/${wrapSignatureThreshold} signatures received)`}
              </StyledTypography>
            </React.Fragment>
          );
        case OperationStatusType.READY:
          return (
            <StyledTypography variant={'body2'}>
              Ready to mint
            </StyledTypography>
          );
      }
    };

    return renderItem(operation, primaryText(), secondaryText(), isLast);
  };

  const renderNftMint = (operation: WrapERC721Operation, isLast: boolean) => {
    const primaryText = () => {
      const { ethereumName } = nftByEthAddress[
        operation.token.toLowerCase()
        ];
      return `mint ${ethereumName} - ${operation.tokenId} to ${ellipsizeAddress(operation.destination)}`;
    };

    const secondaryText = () => {
      switch (operation.status.type) {
        case OperationStatusType.NEW:
          return (
            <StyledTypography variant={'body2'}>
              Waiting for operation to be included
            </StyledTypography>
          );
        case OperationStatusType.WAITING_FOR_CONFIRMATIONS:
          return (
            <StyledTypography variant={'body2'}>
              Pending... {operation.status.confirmations} /{' '}
              {operation.status.confirmationsThreshold} confirmations
            </StyledTypography>
          );
        case OperationStatusType.WAITING_FOR_SIGNATURES:
          return (
            <React.Fragment>
              <StyledTypography variant={'body2'}>
                Waiting for signatures
              </StyledTypography>
              <StyledTypography variant={'body2'}>
                {`(${
                  Object.keys(operation.status.signatures).length
                }/${wrapSignatureThreshold} signatures received)`}
              </StyledTypography>
            </React.Fragment>
          );
        case OperationStatusType.READY:
          return (
            <StyledTypography variant={'body2'}>
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
            <StyledTypography variant={'body2'}>
              Waiting for operation to be included
            </StyledTypography>
          );
        case OperationStatusType.WAITING_FOR_CONFIRMATIONS:
          return (
            <StyledTypography variant={'body2'}>
              Pending... {operation.status.confirmations} /{' '}
              {operation.status.confirmationsThreshold} confirmations
            </StyledTypography>
          );
        case OperationStatusType.WAITING_FOR_SIGNATURES:
          return (
            <React.Fragment>
              <StyledTypography variant={'body2'}>
                Waiting for signatures
              </StyledTypography>
              <StyledTypography variant={'body2'}>
                {`(${
                  Object.keys(operation.status.signatures).length
                }/${unwrapSignatureThreshold} signatures received)`}
              </StyledTypography>
            </React.Fragment>
          );
        case OperationStatusType.READY:
          return (
            <StyledTypography variant={'body2'}>
              Ready to release
            </StyledTypography>
          );
      }
    };

    return renderItem(operation, primaryText(), secondaryText(), isLast);
  };

  const renderNftBurn = (operation: UnwrapERC721Operation, isLast: boolean) => {
    const primaryText = () => {
      const { ethereumName } = nftByEthAddress[
        operation.token.toLowerCase()
        ];
      return `release ${ethereumName} - ${operation.tokenId} to ${ellipsizeAddress(operation.destination)}`;
    };

    const secondaryText = () => {
      switch (operation.status.type) {
        case OperationStatusType.NEW:
          return (
            <StyledTypography variant={'body2'}>
              Waiting for operation to be included
            </StyledTypography>
          );
        case OperationStatusType.WAITING_FOR_CONFIRMATIONS:
          return (
            <StyledTypography variant={'body2'}>
              Pending... {operation.status.confirmations} /{' '}
              {operation.status.confirmationsThreshold} confirmations
            </StyledTypography>
          );
        case OperationStatusType.WAITING_FOR_SIGNATURES:
          return (
            <React.Fragment>
              <StyledTypography variant={'body2'}>
                Waiting for signatures
              </StyledTypography>
              <StyledTypography variant={'body2'}>
                {`(${
                  Object.keys(operation.status.signatures).length
                }/${unwrapSignatureThreshold} signatures received)`}
              </StyledTypography>
            </React.Fragment>
          );
        case OperationStatusType.READY:
          return (
            <StyledTypography variant={'body2'}>
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
          <StyledListItem>
            <StyledTypography variant={'body1'}>
              Please connect to at least one wallet to see your pending
              operations
            </StyledTypography>
          </StyledListItem>
        )}
        {canFetch && (
          <List style={{ padding: '0px' }}>
            <StyledListSubheader>
              NFT Release operations
            </StyledListSubheader>
            {operations.nftBurns.map((o, i) =>
              renderNftBurn(o, i === operations.nftBurns.length - 1)
            )}
            {operations.nftBurns.length === 0 && (
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
