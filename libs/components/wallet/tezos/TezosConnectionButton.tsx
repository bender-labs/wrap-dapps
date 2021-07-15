import { useTezosWalletContext } from './useTezosWallet';
import { TezosStateType } from './state';
import { Button } from '@material-ui/core';
import TezosIcon from './Icon';

export default function TezosConnectionButton() {
  const { state, activate, deactivate } = useTezosWalletContext();
  switch (state.type) {
    case TezosStateType.NOT_CONNECTED:
      return <Button onClick={activate}><TezosIcon/><span style={{padding: '4px'}}></span>Connect</Button>;
    case TezosStateType.CONNECTING:
      return <div>Connecting...</div>;
    case TezosStateType.CONNECTED:
      return <Button onClick={deactivate}><TezosIcon/><span style={{padding: '4px'}}></span>{state.tezosAccount}</Button>;
  }
}
