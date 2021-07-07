import { useTezosWalletContext } from './useTezosWallet';
import { TezosStateType } from './state';
import { Button, makeStyles, darken } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  connectButton: {
    backgroundColor: '#FFFFFF',
    textTransform: 'none',
    fontWeight: 900,
    fontSize: '0.9rem',
    borderRadius: '25px',
    padding: '3px 25px',
    '&:hover': {
      backgroundColor: '#FFd000'
    },
    '&.Mui-disabled': {
      color: '#B1B1B1',
    },
  },
  connectedConnectButton: {
    backgroundColor: '#FFd000',
    '&:hover': {
      backgroundColor: darken('#FFd000', 0.1),
    },
  },
}));

export default function TezosConnectionButton() {
  const classes = useStyles();
  const { state, activate, deactivate } = useTezosWalletContext();
  switch (state.type) {
    case TezosStateType.NOT_CONNECTED:
      return <Button className={classes.connectButton} onClick={activate}>CONNECT</Button>;
    case TezosStateType.CONNECTING:
      return <div>Doing stuff, hold my beer</div>;
    case TezosStateType.CONNECTED:
      return <Button className={classes.connectedConnectButton} onClick={deactivate}>{state.tezosAccount}</Button>;
  }
}
