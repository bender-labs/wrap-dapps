import { useEthereumWalletContext } from './useEthereumWallet';
import Icon from './Icon';
import React, { useState } from 'react';
import { EthereumStateType } from './state';
import { EthConnector, EthConnectors } from './connectorsFactory';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled
} from '@mui/material';
import { ellipsizeAddress } from '../address';

const StyledDialogTitle = styled(DialogTitle)(() => ({
  backgroundColor: '#191919',
  color: '#FFFFFF',
  fontSize: 20,
  fontWeight: 700,
  textAlign: 'center'
}));

const StyledListItem = styled(ListItem)(() => ({
  backgroundColor: '#191919',
  color: '#FFFFFF',
  borderTop: '1px solid #444444',
  '&:hover': {
    backgroundColor: '#4d4d4d'
  }
}));

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
      <Dialog open={show} onClose={() => setShow(false)} maxWidth={'xs'} fullWidth={true}>
        <StyledDialogTitle disableTypography={true}>
          Select your wallet
        </StyledDialogTitle>
        <List>
          {Object.entries(providers).map(([key, value]) => (
            <StyledListItem
              key={key}
              button
              onClick={() => {
                handleSelect(key);
              }}
            >
              <ListItemText primary={value.name} />
              <ListItemIcon>
                <Box
                  component='img'
                  sx={{ width: '37px', height: '37px' }}
                  src={value.iconName}
                />
              </ListItemIcon>
            </StyledListItem>
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
          {ellipsizeAddress(context.state.ethereumAccount)}
        </Button>
      );
  }
}
