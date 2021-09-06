import React from 'react';
import OperationScreen from './OperationScreen';
import { OperationType } from '@wrap-dapps/features';

export function UnwrapOperationScreen() {
  return <OperationScreen type={OperationType.UNWRAP} />;
}