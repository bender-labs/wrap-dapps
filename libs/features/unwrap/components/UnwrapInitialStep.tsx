import BigNumber from 'bignumber.js';
import { TokenMetadata } from '../../swap';
import { Fees, Token } from '@wrap-dapps/api';
import React, { useEffect, useState } from 'react';
import { wrapERC20Fees } from '../../fees/fees';
import { AssetSummary, PaperContent, TokenSelection } from '@wrap-dapps/components';
import { SupportedBlockchain } from '../../wallet/blockchain';
import AmountToWrapInput from '../../../components/token/AmountToWrapInput';
import { Box, Button, styled } from '@material-ui/core';
import MultiConnect from '../../wallet/MultiConnect';
import { UnwrapStatus } from '../hooks/reducer';

const PaperContentTitle = styled(PaperContent)(() => ({
  borderBottom: '3px solid #E0E0E0',
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.25)'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'black',
  backgroundColor: '#ffffff',
  width: '40%',
  borderRadius: '25px',
  float: 'right',
  boxShadow: 'none',
  textTransform: 'none',
  fontWeight: 900,
  '&:active': {
    boxShadow: 'none'
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none'
  },
  '&:disabled': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  }
}));

export type UnwrapInitialStepProps = {
  status: UnwrapStatus;
  balance: { value: BigNumber, loading: boolean };
  token: TokenMetadata;
  connected: boolean;
  amount: BigNumber;
  fees: Fees;
  onAmountChange: (v: BigNumber) => void;
  onTokenChange: (t: string) => void;
  tokens: Record<string, Token>;
  onNext: () => void;
};

export default function UnwrapInitialStep({
                                            amount,
                                            balance,
                                            connected,
                                            fees,
                                            onAmountChange,
                                            onNext,
                                            onTokenChange,
                                            status,
                                            token,
                                            tokens
                                          }: UnwrapInitialStepProps) {
  const [currentFees, setCurrentFees] = useState(new BigNumber(0));

  useEffect(() => setCurrentFees(wrapERC20Fees(amount, fees)), [amount, fees]);

  return (
    <>
      {!connected && (
        <PaperContentTitle>
          <MultiConnect />
        </PaperContentTitle>
      )}
      <Box sx={{ padding: '34px 50px 0 50px' }}>
        <PaperContent>
          <TokenSelection
            token={token.ethereumSymbol}
            onTokenSelect={onTokenChange}
            blockchainTarget={SupportedBlockchain.Tezos}
            tokens={tokens}
            disabled={false}
          />
          <AmountToWrapInput
            balance={balance}
            decimals={token.decimals}
            symbol={token.tezosSymbol}
            onChange={onAmountChange}
            amountToWrap={amount}
            displayBalance={connected}
          />
        </PaperContent>
      </Box>
      <Box sx={{ padding: '16px 0' }}>
        <PaperContent>
          <AssetSummary
            label={'You will receive'}
            value={amount.minus(currentFees)}
            symbol={token.ethereumSymbol}
            decimals={token.decimals}
          />
        </PaperContent>
      </Box>
      <Box sx={{
        borderRadius: '0 0 10px 10px',
        minHeight: '40px',
        padding: '50px 30px'
      }}>
        <PaperContent>
          {connected && (
            <StyledButton
              variant={'contained'}
              color={'primary'}
              onClick={onNext}
              disabled={status !== UnwrapStatus.READY_TO_CONFIRM}
            >
              Next →
            </StyledButton>
          )}
        </PaperContent>
      </Box>
    </>
  );
}
