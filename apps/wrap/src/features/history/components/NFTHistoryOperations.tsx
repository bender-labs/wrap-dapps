import * as React from 'react';
import { useMemo } from 'react';
import { Link, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ellipsizeAddress, ERC721Operation, OperationType } from '@wrap-dapps/features';
import { NonFungibleToken } from '@wrap-dapps/api';

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

const renderRow = (
  op: ERC721Operation,
  tokensByEthAddress: Record<string, NonFungibleToken>
) => {
  switch (op.type) {
    case OperationType.WRAP_NFT:
      return (
        <StyledTableRow key={op.hash}>
          <StyledTableCellBody align='center'>
            {tokensByEthAddress[op.token]?.ethereumName}
          </StyledTableCellBody>
          <StyledTableCellBody align='center'>
            {op.tokenId}
          </StyledTableCellBody>
          <StyledTableCellBody align='center'>{op.source}</StyledTableCellBody>
          <StyledTableCellBody align='center'>{op.destination}</StyledTableCellBody>
          <StyledTableCellBody align='center'>{op.status.type}</StyledTableCellBody>
          <StyledTableCellBody align='center'>
            <Link
              href={`https://etherscan.io/tx/${op.hash}`}
              rel='noreferrer'
              target='_blank'
              color='inherit'
            >
              {ellipsizeAddress(op.hash)}
            </Link>
          </StyledTableCellBody>
        </StyledTableRow>
      );
    case OperationType.UNWRAP_NFT:
      return (
        <StyledTableRow key={op.hash}>
          <StyledTableCellBody align='center'>
            {tokensByEthAddress[op.token]?.ethereumName}
          </StyledTableCellBody>
          <StyledTableCellBody align='center'>
            {op.tokenId}
          </StyledTableCellBody>
          <StyledTableCellBody align='center'>{op.source}</StyledTableCellBody>
          <StyledTableCellBody align='center'>{op.destination}</StyledTableCellBody>
          <StyledTableCellBody align='center'>{op.status.type}</StyledTableCellBody>
          <StyledTableCellBody align='center'>
            <Link
              href={`https://tzkt.io/${op.hash}`}
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
  operations: ERC721Operation[];
  nonFungibleTokens: Record<string, NonFungibleToken>;
};

export default function NFTHistoryOperations({ operations, nonFungibleTokens }: OperationsProps) {
  const tokensByEthAddress = useMemo(
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

  let active = operations.length > 0;

  return (
    <div style={{ width: '100%' }}>
      <DivWrapper>
        <TableContainer>
          <StyledTable aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCellHead align='center'>Collection</StyledTableCellHead>
                <StyledTableCellHead align='center'>Token</StyledTableCellHead>
                <StyledTableCellHead align='center'>Source</StyledTableCellHead>
                <StyledTableCellHead align='center'>Destination</StyledTableCellHead>
                <StyledTableCellHead align='center'>Status</StyledTableCellHead>
                <StyledTableCellHead align='center'>Transaction Hash</StyledTableCellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {active ? (
                operations.map((op) => renderRow(op, tokensByEthAddress))
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
