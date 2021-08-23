import { AmountToWrapInput, AssetSummary, PaperContent, TokenSelection } from '@wrap-dapps/components';
import React, { useEffect, useState } from 'react';
import { SupportedBlockchain } from '../../wallet';
import BigNumber from 'bignumber.js';
import { Fees, FungibleToken, Token } from '@wrap-dapps/api';
import { Box, Button, styled } from '@material-ui/core';
import { wrapERC20Fees } from '../../fees/fees';
import MultiConnect from '../../wallet/MultiConnect';
import { WrapStatus } from '../hooks';

// const Title = styled(PaperContent)(() => ({
//   borderBottom: '3px solid #E0E0E0',
//   boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.25)'
// }));

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

export type WrapInitialStepProps = {
  status: WrapStatus;
  balance: { value: BigNumber, loading: boolean };
  token: FungibleToken;
  connected: boolean;
  amount: BigNumber;
  fees: Fees;
  onAmountChange: (v: BigNumber) => void;
  onTokenChange: (t: string) => void;
  tokens: Record<string, Token>;
  onNext: () => void;
};

export default function WrapInitialStep({
                                          status,
                                          balance,
                                          connected,
                                          onAmountChange,
                                          token,
                                          amount,
                                          onTokenChange,
                                          tokens,
                                          fees,
                                          onNext
                                        }: WrapInitialStepProps) {
  const [currentFees, setCurrentFees] = useState(new BigNumber(0));
  useEffect(() => setCurrentFees(wrapERC20Fees(amount, fees)), [amount, fees]);

  return (
    <>
      {!connected && (
        <PaperContent>
          <MultiConnect />
        </PaperContent>
      )}
      <Box sx={{ padding: '34px 50px 0 50px' }}>
        <PaperContent>
          <TokenSelection
            token={token.ethereumSymbol}
            onTokenSelect={onTokenChange}
            blockchainTarget={SupportedBlockchain.Ethereum}
            tokens={tokens}
            disabled={false}
          />
          <AmountToWrapInput
            balance={balance}
            decimals={token.decimals}
            symbol={token.ethereumSymbol}
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
            symbol={token.tezosSymbol}
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
              disabled={
                status !== WrapStatus.READY_TO_CONFIRM &&
                status !== WrapStatus.READY_TO_WRAP
              }
            >
              Next →
            </StyledButton>
          )}
        </PaperContent>
      </Box>
    </>
  );
}
