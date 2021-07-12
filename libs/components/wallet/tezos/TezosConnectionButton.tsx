import { useTezosWalletContext } from './useTezosWallet';
import { TezosStateType } from './state';
import { Button } from 'theme-ui';

export default function TezosConnectionButton() {
  const { state, activate, deactivate } = useTezosWalletContext();
  switch (state.type) {
    case TezosStateType.NOT_CONNECTED:
      return (
        <Button variant={'inverted'} onClick={activate}>
          Connect
        </Button>
      );
    case TezosStateType.CONNECTING:
      return <div>Doing stuff, hold my beer</div>;
    case TezosStateType.CONNECTED:
      return (
        <Button variant={'primary'} onClick={deactivate}>
          {state.tezosAccount}
        </Button>
      );
  }
}
