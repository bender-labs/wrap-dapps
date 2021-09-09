import React from 'react';
import { useERC20OperationsHistory } from '../../features/history/hooks/useERC20OperationsHistory';
import HistoryTab from '../../features/history/components/HistoryTab';
import { Container } from '@mui/material';
import HistoryOperations from '../../features/history/components/HistoryOperations';
import { useConfig } from '@wrap-dapps/components';

export default function HistoryUnwrapOperationsScreen() {
  const { tzktLink, etherscanLink } = useConfig();
  const { operations, fungibleTokens } = useERC20OperationsHistory();

  return (
    <Container maxWidth='xl'>
      <HistoryTab />
      <HistoryOperations operations={operations.burns} fungibleTokens={fungibleTokens} tzktLink={tzktLink}
                         etherscanLink={etherscanLink} />
    </Container>
  );
}
