import React from 'react';
import OperationScreen from './OperationScreen';
import { OperationType } from '@wrap-dapps/features';

export function WrapOperationScreen() {
  return <OperationScreen type={OperationType.WRAP} />;
}