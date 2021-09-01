import React from 'react';
import { useAllNFTOperationsHistory } from '../features/history/hooks/useAllNFTOperationsHistory';
import HistoryTab from '../features/history/components/HistoryTab';
import HistoryOperations from '../features/history/components/HistoryOperations';

export default function HistoryWrapOperationsScreen() {
  const { operations, nonFungibleTokens } = useAllNFTOperationsHistory();
  return (
    <>
      <>
        <HistoryTab />
        <HistoryOperations operations={operations.mints} nonFungibleTokens={nonFungibleTokens} />
      </>
    </>
  );
}
