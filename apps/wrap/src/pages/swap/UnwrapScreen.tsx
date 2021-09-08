import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
  UnwrapConfirmStep,
  UnwrapInitialStep,
  UnwrapStatus,
  usePendingOperationsActions,
  useUnwrap
} from '@wrap-dapps/features';
import { unwrapPage } from '../routes';
import { SwapDirectionTab } from '../../features/swap/components/SwapDirectionTab';
import { Container } from '@mui/material';

enum Step {
  AMOUNT,
  CONFIRM,
}

export function UnwrapScreen() {
  const [step, setStep] = useState(Step.AMOUNT);
  const {
    fees,
    fungibleTokens,
    launchUnwrap,
    runNetworkFeesEstimate,
    selectAmountToUnwrap,
    selectToken,
    status,
    token,
    connected,
    currentBalance,
    balanceNotYetFetched,
    amountToUnwrap,
    tezosAccount,
    ethereumAccount,
    operation,
    agree,
    costEstimate
  } = useUnwrap();

  const { addOperation } = usePendingOperationsActions();

  const history = useHistory();

  useEffect(() => {
    if (status !== UnwrapStatus.UNWRAP_DONE || !operation) {
      return;
    }
    const nextStep = async () => {
      await addOperation(operation);
      history.push(unwrapPage(operation));
    };
    // noinspection JSIgnoredPromiseFromCall
    nextStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, operation]);

  useEffect(() => {
    if (status === UnwrapStatus.NOT_READY && step === Step.CONFIRM) {
      setStep(Step.AMOUNT);
    }
  }, [status, step]);

  const doLaunchUnwrap = async () => {
    const op = await launchUnwrap();
    if (!op) {
      return;
    }
    await addOperation(op);
    history.push(unwrapPage(op));
    return op;
  };

  function next() {
    runNetworkFeesEstimate();
    setStep(Step.CONFIRM);
  }

  // noinspection RequiredAttributes
  return (
    <Container maxWidth='xs' sx={{ marginBottom: 10 }}>
      {step === Step.AMOUNT && (
        <>
          <SwapDirectionTab />
          <UnwrapInitialStep
            status={status}
            tokens={fungibleTokens}
            token={fungibleTokens[token]}
            connected={connected}
            balance={{ value: currentBalance, loading: balanceNotYetFetched }}
            amount={amountToUnwrap}
            fees={fees}
            onNext={next}
            onTokenChange={selectToken}
            onAmountChange={selectAmountToUnwrap}
          />
        </>
      )}
      {step === Step.CONFIRM && (
        <UnwrapConfirmStep
          token={fungibleTokens[token]}
          status={status}
          recipientAddress={ethereumAccount()!}
          sendingAddress={tezosAccount()!}
          onAgreementChange={agree}
          amount={amountToUnwrap}
          fees={fees}
          networkCost={costEstimate}
          onPrevious={() => setStep(Step.AMOUNT)}
          onUnwrap={doLaunchUnwrap}

        />
      )}
    </Container>
  );
}
