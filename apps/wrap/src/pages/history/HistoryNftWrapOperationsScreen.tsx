import React from 'react';
import { useERC721OperationsHistory } from '../../features/history/hooks/useERC721OperationsHistory';
import HistoryTab from '../../features/history/components/HistoryTab';
import NFTHistoryOperations from '../../features/history/components/NFTHistoryOperations';
import { Container } from '@mui/material';
import { useConfig } from '@wrap-dapps/components';

export default function HistoryNftWrapOperationsScreen() {
  const { tzktLink, etherscanLink } = useConfig();
  const { operations, nonFungibleTokens } = useERC721OperationsHistory();

  return (
    <Container maxWidth='xl'>
      <HistoryTab />
      <NFTHistoryOperations operations={operations.mints} nonFungibleTokens={nonFungibleTokens} tzktLink={tzktLink}
                            etherscanLink={etherscanLink} />
    </Container>
  );
}
