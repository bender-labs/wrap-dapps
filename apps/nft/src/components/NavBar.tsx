import TezosConnectionButton from '@wrap-dapps/components/wallet/tezos/TezosConnectionButton';
import React from 'react';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-yellow-300 p-6">
      <p>Bender Labs</p>
      <div>
        <TezosConnectionButton />
      </div>
    </nav>
  );
}
