import * as React from 'react';
import { useMemo } from 'react';
import { Link, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ellipsizeAddress, ERC20Operation, OperationType, SupportedBlockchain } from '@wrap-dapps/features';
import { FungibleToken, Token } from '@wrap-dapps/api';
import { Amount, EthereumTokenIcon, TezosTokenIcon } from '@wrap-dapps/components';

const StyledTableCellBody = styled(TableCell)(() => ({
  fontSize: 14,
  padding: '20px',
  backgroundColor: 'white',
  '&:first-child': {
    borderRadius: '20px 0 0 20px'
  },
  '&:last-child': {
    borderRadius: '0 20px 20px 0'
  }
}));

const StyledTableCellHead = styled(TableCell)(() => ({
  backgroundColor: '#e5e5e5',
  color: 'black',
  padding: '0px',
  fontWeight: 'bold'
}));

const StyledTableRow = styled(TableRow)(() => ({
  root: {
    margin: '50px'
  }
}));

const DivWrapper = styled('div')(() => ({
  padding: '20px',
  backgroundColor: '#e5e5e5',
  borderRadius: '0 0 10px 10px'
}));

const StyledTable = styled(Table)(() => ({
  minWidth: 700,
  backgroundColor: '#e5e5e5',
  boxShadow: 'none',
  borderSpacing: '0 5px !important',
  borderCollapse: 'separate'
}));

const itemIcon = (
  blockchainTarget: SupportedBlockchain,
  tokenMetadata: Token
) => {
  return blockchainTarget === SupportedBlockchain.Ethereum ? (
    <EthereumTokenIcon tokenMetadata={tokenMetadata} />
  ) : (
    <TezosTokenIcon url={tokenMetadata.thumbnailUri ?? ''} width={28} height={28} />
  );
};

const renderRow = (
  op: ERC20Operation,
  tokensByEthAddress: Record<string, FungibleToken>,
  tzktLink: string,
  etherscanLink: string
) => {
  switch (op.type) {
    case OperationType.WRAP:
      return (
        <StyledTableRow key={op.hash}>
          <StyledTableCellBody align='left'>
            {itemIcon(SupportedBlockchain.Ethereum, tokensByEthAddress[op.token])}
            <Amount
              symbol={tokensByEthAddress[op.token].ethereumSymbol}
              value={op.amount}
              decimals={tokensByEthAddress[op.token].decimals}
            />
          </StyledTableCellBody>
          <StyledTableCellBody align='center'>{op.source}</StyledTableCellBody>
          <StyledTableCellBody align='center'>{op.destination}</StyledTableCellBody>
          <StyledTableCellBody align='center'>{op.status.type}</StyledTableCellBody>
          <StyledTableCellBody align='center'>
            <Link
              href={`${etherscanLink}tx/${op.hash}`}
              rel='noreferrer'
              target='_blank'
              color='inherit'
            >
              {ellipsizeAddress(op.hash)}
            </Link>
          </StyledTableCellBody>
        </StyledTableRow>
      );
    case OperationType.UNWRAP:
      return (
        <StyledTableRow key={op.hash}>
          <StyledTableCellBody align='left'>
            {itemIcon(SupportedBlockchain.Tezos, tokensByEthAddress[op.token])}
            <Amount
              symbol={tokensByEthAddress[op.token].tezosSymbol}
              value={op.amount}
              decimals={tokensByEthAddress[op.token].decimals}
            />
          </StyledTableCellBody>
          <StyledTableCellBody align='center'>{op.source}</StyledTableCellBody>
          <StyledTableCellBody align='center'>{op.destination}</StyledTableCellBody>
          <StyledTableCellBody align='center'>{op.status.type}</StyledTableCellBody>
          <StyledTableCellBody align='center'>
            <Link
              href={`${tzktLink}${op.hash}`}
              rel='noreferrer'
              color='inherit'
              target='_blank'
            >
              {ellipsizeAddress(op.hash)}
            </Link>
          </StyledTableCellBody>
        </StyledTableRow>
      );
  }
};

export type OperationsProps = {
  operations: ERC20Operation[];
  fungibleTokens: Record<string, FungibleToken>;
  tzktLink: string;
  etherscanLink: string;
};

export default function HistoryOperations({ operations, fungibleTokens, tzktLink, etherscanLink }: OperationsProps) {
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

  let active = operations.length > 0;

  return (
    <div style={{ width: '100%' }}>
      <DivWrapper>
        <TableContainer>
          <StyledTable aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCellHead align='center'>Amount</StyledTableCellHead>
                <StyledTableCellHead align='center'>Source</StyledTableCellHead>
                <StyledTableCellHead align='center'>Destination</StyledTableCellHead>
                <StyledTableCellHead align='center'>Status</StyledTableCellHead>
                <StyledTableCellHead align='center'>Transaction Hash</StyledTableCellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {active ? (
                operations.map((op) => renderRow(op, tokensByEthAddress, tzktLink, etherscanLink))
              ) : (
                <TableRow>
                  <TableCell>No data to display...</TableCell>
                </TableRow>
              )}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </DivWrapper>
    </div>
  );
}
