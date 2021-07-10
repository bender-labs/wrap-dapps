import { useEthereumWalletContext } from './useEthereumWallet';

import React, { PropsWithChildren, useState } from 'react';
import { EthereumStateType } from './state';
import { EthConnector, EthConnectors } from './connectorsFactory';
import { Button } from 'theme-ui';
import { Modal } from '../../modal';

type SelectorProps = {
  providers: EthConnectors;
  activate: (p: EthConnector) => void;
};

function ConnectFlow({ providers, activate }: SelectorProps) {
  const [show, setShow] = useState(false);
  const handleSelect = (key: string) => {
    setShow(false);
    const connector = providers[key as keyof EthConnectors];
    activate(connector);
  };
  return (
    <>
      <Button variant={'white'} onClick={() => setShow(true)}>
        Connect
      </Button>
      <Modal isOpen={show} onClose={() => setShow(false)}>
        <ul>
          {Object.entries(providers).map(([key, value]) => (
            <li
              key={key}
              onClick={() => {
                handleSelect(key);
              }}
            >
              {value.name}
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}

export default function EthereumConnectionButton() {
  const context = useEthereumWalletContext();
  switch (context.state.type) {
    case EthereumStateType.NOT_CONNECTED:
      return (
        <ConnectFlow
          providers={context.connectors}
          activate={context.activate}
        />
      );
    case EthereumStateType.CONNECTING:
      return <p>Connecting</p>;
    case EthereumStateType.CONNECTED:
      return (
        <Button variant={'primary'} onClick={context.deactivate}>
          {context.state.ethereumAccount}
        </Button>
      );
  }
}
