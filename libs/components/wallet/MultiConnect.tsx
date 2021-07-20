import { EthereumConnectionButton, useEthereumWalletContext } from './ethereum';
import { TezosConnectionButton, useTezosWalletContext } from './tezos';
import { Box, Step, StepLabel, Stepper } from '@material-ui/core';
import { TezosStateType } from './tezos/state';
import { EthereumStateType } from './ethereum/state';
import { CustomConnector, CustomStepIcon } from '../stepper';

export default function MultiConnect() {
  const { state } = useTezosWalletContext();
  const tzAccount = state.type === TezosStateType.CONNECTED;

  const context = useEthereumWalletContext();
  const ethAccount = context.state.type === EthereumStateType.CONNECTED;

  const activeStep = () => {
    if (tzAccount && ethAccount) {
      return 2;
    }
    if (tzAccount) {
      return 1;
    }
    return 0;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Stepper
        sx={{
          paddingTop: 2,
          paddingBottom: 0,
        }}
        alternativeLabel
        activeStep={activeStep()}
        connector={<CustomConnector />}
      >
        <Step>
          <StepLabel StepIconComponent={CustomStepIcon}>
            <TezosConnectionButton />
          </StepLabel>
        </Step>
        <Step>
          <StepLabel StepIconComponent={CustomStepIcon}>
            <EthereumConnectionButton />
          </StepLabel>
        </Step>
      </Stepper>
    </Box>
  );
}
