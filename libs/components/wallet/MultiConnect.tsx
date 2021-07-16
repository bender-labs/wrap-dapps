import { EthereumConnectionButton, useEthereumWalletContext } from './ethereum';
import { TezosConnectionButton, useTezosWalletContext } from './tezos';
import {
  Box,
  Card,
  CardContent,
  Step,
  StepLabel,
  Stepper
} from '@material-ui/core';
import CustomStepIcon from '../stepper/CustomStepIcon';
import CustomConnector from '../stepper/CustomConnector';
import { TezosStateType } from './tezos/state';
import { EthereumStateType } from './ethereum/state';

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
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            m: 2,
          }}
        >
          <Stepper
            sx={{
              backgroundColor: '#E5E5E5',
              padding: '24px 0px',
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
      </CardContent>
    </Card>
  );
}
