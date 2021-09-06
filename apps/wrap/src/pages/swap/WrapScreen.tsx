import {
  usePendingOperationsActions,
  useWrap,
  WrapConfirmStep,
  WrapInitialStep,
  WrapStatus
} from '@wrap-dapps/features';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { wrapPage } from '../routes';
import { SwapDirectionTab } from '../../features/swap/components/SwapDirectionTab';
import { Container } from '@material-ui/core';

enum Step {
  AMOUNT,
  CONFIRM,
}

export function WrapScreen() {
  const {
    status,
    amountToWrap,
    currentAllowance,
    currentBalance,
    token,
    launchAllowanceApproval,
    selectAmountToWrap,
    balanceNotYetFetched,
    selectToken,
    launchWrap,
    connected,
    fungibleTokens,
    fees,
    ethereumAccount,
    tezosAccount,
    agree,
    networkFees
  } = useWrap();

  const [step, setStep] = useState(Step.AMOUNT);
  const { addOperation } = usePendingOperationsActions();

  const history = useHistory();

  const doLaunchWrap = async () => {
    const op = await launchWrap();
    if (!op) {
      return;
    }
    await addOperation(op);
    history.push(wrapPage(op));
    return op;
  };
  useEffect(() => {
    if (status === WrapStatus.NOT_READY && step === Step.CONFIRM) {
      setStep(Step.AMOUNT);
    }
  }, [status, step]);
  // noinspection RequiredAttributes
  return (
    <Container maxWidth='xs' sx={{ marginBottom: 10 }}>
      {step === Step.AMOUNT && (
        <>
          <SwapDirectionTab />
          <WrapInitialStep
            status={status}
            tokens={fungibleTokens}
            token={fungibleTokens[token]}
            connected={connected}
            balance={{ value: currentBalance, loading: balanceNotYetFetched }}
            amount={amountToWrap}
            fees={fees}
            onNext={() => setStep(Step.CONFIRM)}
            onTokenChange={selectToken}
            onAmountChange={selectAmountToWrap}
          />
        </>
      )}
      {step === Step.CONFIRM && (
        <WrapConfirmStep
          token={fungibleTokens[token]}
          fees={fees}
          amount={amountToWrap}
          status={status}
          currentAllowance={currentAllowance}
          recipientAddress={tezosAccount()!}
          sendingAddress={ethereumAccount()!}
          onWrap={doLaunchWrap}
          onAgreementChange={agree}
          onAuthorize={launchAllowanceApproval}
          onPrevious={() => setStep(Step.AMOUNT)}
          networkFees={networkFees}
        />
      )}
    </Container>
  );
}
