import { useEthereumWalletContext } from './useEthereumWallet';
import Icon from './Icon';
import React, { useState } from 'react';
import { EthereumStateType } from './state';
import { EthConnector, EthConnectors } from './connectorsFactory';
import {
  Box,
  Button,
  Dialog,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';

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
      <Button onClick={() => setShow(true)} startIcon={<Icon />}>
        Connect
      </Button>
      <Dialog open={show} onClose={() => setShow(false)}>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Select your wallet
            </ListSubheader>
          }
        >
          {Object.entries(providers).map(([key, value]) => (
            <ListItem
              key={key}
              button
              onClick={() => {
                handleSelect(key);
              }}
            >
              <ListItemText primary={value.name} />
              <ListItemIcon>
                <Box
                  component="img"
                  sx={{ width: '37px', height: '37px' }}
                  src={value.iconName}
                />
              </ListItemIcon>
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
      return (
        <Button disabled startIcon={<Icon />}>
          Connecting…
        </Button>
      );
    case EthereumStateType.CONNECTED:
      return (
        <Button color={'primary'} onClick={context.deactivate} startIcon={<Icon />}>
          {context.state.ethereumAccount}
        </Button>
      );
  }
}
