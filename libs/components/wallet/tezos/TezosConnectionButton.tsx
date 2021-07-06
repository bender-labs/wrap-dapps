import { useTezosWalletContext } from './useTezosWallet';
import { TezosStateType } from './state';
import { Button } from '@material-ui/core';

export default function TezosConnectionButton() {
  const { state, activate, deactivate } = useTezosWalletContext();
  switch (state.type) {
    case TezosStateType.NOT_CONNECTED:
      return <Button onClick={activate}>CONNECT</Button>;
    case TezosStateType.CONNECTING:
      return <div>Doing stuff, hold my beer</div>;
    case TezosStateType.CONNECTED:
      return <Button onClick={deactivate}>{state.tezosAccount}</Button>;
  }
}
