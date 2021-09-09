import React from 'react';
import { useERC721OperationsHistory } from '../../features/history/hooks/useERC721OperationsHistory';
import HistoryTab from '../../features/history/components/HistoryTab';
import NFTHistoryOperations from '../../features/history/components/NFTHistoryOperations';
import { Container } from '@mui/material';

export default function HistoryNftWrapOperationsScreen() {
  const { operations, nonFungibleTokens } = useERC721OperationsHistory();

  return (
    <Container maxWidth='xl'>
      <HistoryTab />
      <NFTHistoryOperations operations={operations.mints} nonFungibleTokens={nonFungibleTokens} />
    </Container>
  );
}
