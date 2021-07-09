import { useEthereumWalletContext } from './useEthereumWallet';

import React, { PropsWithChildren, useState } from 'react';
import { EthereumStateType } from './state';
import { EthConnector, EthConnectors } from './connectorsFactory';
import { Button } from 'theme-ui';

function Modal({
  show,
  children,
}: PropsWithChildren<{ show: boolean; onClose: () => void }>) {
  return (
    <>
      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {children}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

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
      <Modal show={show} onClose={() => setShow(false)}>
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

export function EthereumConnectionButton() {
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
