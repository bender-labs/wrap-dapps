import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import TezosConnectionButton from './wallet/tezos/TezosConnectionButton';

export default function MyComponent() {
  return (
    <div>
      <Card>
        <CardHeader>Hello</CardHeader>
        <CardContent>
          <TezosConnectionButton />
        </CardContent>
      </Card>
    </div>
  );
}
