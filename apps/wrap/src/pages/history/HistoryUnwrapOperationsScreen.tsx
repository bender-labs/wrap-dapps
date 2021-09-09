import React from 'react';
import { useERC20OperationsHistory } from '../../features/history/hooks/useERC20OperationsHistory';
import HistoryTab from '../../features/history/components/HistoryTab';
import { Container } from '@mui/material';
import HistoryOperations from '../../features/history/components/HistoryOperations';

export default function HistoryUnwrapOperationsScreen() {
  const { operations, fungibleTokens } = useERC20OperationsHistory();

  return (
    <Container maxWidth='xl'>
      <HistoryTab />
      <HistoryOperations operations={operations.burns} fungibleTokens={fungibleTokens} />
    </Container>
  );
}
