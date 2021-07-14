import { EthereumConnectionButton, useEthereumWalletContext } from './ethereum';
import { TezosConnectionButton, useTezosWalletContext } from './tezos';
import { Step, StepLabel, Stepper } from '@material-ui/core';
import CustomStepIcon from '../stepper/CustomStepIcon';

export default function MultiConnect() {
  const ethereum = useEthereumWalletContext();
  const tezos = useTezosWalletContext();

  const connected = () => {
    if(ethereum && tezos){
      return true
    } else if(tezos){
      return false
    }else{
      return false
    }
  }

  return (
    <>
      <Stepper>

      {null && (
        <>
          <Step>
            <StepLabel StepIconComponent={CustomStepIcon}>
              <TezosConnectionButton />
            </StepLabel>

          </Step>

          <EthereumConnectionButton />
        </>
      )

      }
    </Stepper>

  </>

  )
}