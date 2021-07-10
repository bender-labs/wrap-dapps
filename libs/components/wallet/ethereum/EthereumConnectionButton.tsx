import { useEthereumWalletContext } from './useEthereumWallet';

import React, { useState } from 'react';
import { EthereumStateType } from './state';
import { EthConnector, EthConnectors } from './connectorsFactory';
import { Button, Flex, Image, Paragraph } from 'theme-ui';
import { Dialog } from '../../Dialog';
import { List, ListHeader, ListItem } from '../../List';

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
      <Dialog isOpen={show} onClose={() => setShow(false)}>
        <List>
          <ListHeader text="Select your wallet" />
          {Object.entries(providers).map(([key, value]) => (
            <ListItem
              key={key}
              button
              onClick={() => {
                handleSelect(key);
              }}
            >
              <Flex sx={{ justifyContent: 'space-between' }}>
                <Paragraph>{value.name}</Paragraph>
                <Image src={value.iconName} variant="medium" />
              </Flex>
            </ListItem>
          ))}
        </List>
      </Dialog>
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
