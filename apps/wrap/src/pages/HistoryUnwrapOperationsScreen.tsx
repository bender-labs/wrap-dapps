import React from 'react';
import { useAllNFTOperationsHistory } from '../features/history/hooks/useAllNFTOperationsHistory';
import HistoryTab from '../features/history/components/HistoryTab';
import HistoryOperations from '../features/history/components/HistoryOperations';
import { Container } from '@material-ui/core';

export default function HistoryUnwrapOperationsScreen() {
  const { operations, nonFungibleTokens } = useAllNFTOperationsHistory();

  return (
    <Container maxWidth='lg'>
      <HistoryTab />
      <HistoryOperations operations={operations.burns} nonFungibleTokens={nonFungibleTokens} />
    </Container>
  );
}
