import React from 'react';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { NftAllowanceButton } from './NftAllowanceButton';
import { CustomConnector, CustomStepIcon, LoadableButton } from '@wrap-dapps/components';
import { NftWrapStatus } from '../hooks/reducer';

export type WrapActionsProp = {
  isAllowed: boolean;
  onAuthorize: () => void;
  onWrap: () => void;
  status: NftWrapStatus;
};

export function NftWrapActions({
                                 isAllowed,
                                 onAuthorize,
                                 status,
                                 onWrap
                               }: WrapActionsProp) {
  const activeStep = () => {
    if (
      status === NftWrapStatus.READY_TO_WRAP ||
      status === NftWrapStatus.WAITING_FOR_WRAP
    ) {
      return 1;
    }
    return 0;
  };

  return (
    <Box sx={{ borderRadius: '0 0 10px 10px', backgroundColor: '#e5e5e5', paddingTop: 2}}>
      <Stepper
        alternativeLabel
        activeStep={activeStep()}
        style={{ paddingBottom: 0, backgroundColor: '#e5e5e5' }}
        connector={<CustomConnector />}
      >
        <Step>
          <StepLabel StepIconComponent={CustomStepIcon}>
            <NftAllowanceButton
              isAllowed={isAllowed}
              onAuthorize={onAuthorize}
              loading={status === NftWrapStatus.WAITING_FOR_ALLOWANCE_APPROVAL}
              enabled={status === NftWrapStatus.AGREEMENT_CONFIRMED}
            />
          </StepLabel>
        </Step>
        <Step>
          <StepLabel StepIconComponent={CustomStepIcon}>
            <LoadableButton
              loading={status === NftWrapStatus.WAITING_FOR_WRAP}
              variant={'contained'}
              onClick={onWrap}
              disabled={status !== NftWrapStatus.READY_TO_WRAP}
              text={'Wrap'}
            />
          </StepLabel>
        </Step>
      </Stepper>
    </Box>
  );
}
