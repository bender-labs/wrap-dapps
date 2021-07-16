import { useTezosWalletContext } from './useTezosWallet';
import { TezosStateType } from './state';
import { Button } from '@material-ui/core';
import TezosIcon from './Icon';

export default function TezosConnectionButton() {
  const { state, activate, deactivate } = useTezosWalletContext();
  switch (state.type) {
    case TezosStateType.NOT_CONNECTED:
      return (
        <Button onClick={activate} startIcon={<TezosIcon />}>
          Connect
        </Button>
      );
    case TezosStateType.CONNECTING:
      return (
        <Button disabled startIcon={<TezosIcon />}>
          Connecting...
        </Button>
      );
    case TezosStateType.CONNECTED:
      return (
        <Button onClick={deactivate} startIcon={<TezosIcon />}>
          {state.tezosAccount}
        </Button>
      );
  }
}
