import BigNumber from 'bignumber.js';
import { Fees, FungibleToken, Token } from '@wrap-dapps/api';
import React, { useEffect, useState } from 'react';
import { wrapERC20Fees } from '../../fees/fees';
import { AssetSummary, MultiConnect, TokenSelection } from '@wrap-dapps/components';
import { SupportedBlockchain } from '../../wallet';
import AmountToWrapInput from '../../../components/formatting/AmountToWrapInput';
import { Box, Button, styled } from '@mui/material';
import { UnwrapStatus } from '../hooks';

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
  token: FungibleToken;
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
        <Box sx={{ borderBottom: '3px solid #E0E0E0', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.25)', backgroundColor: '#E5E5E5', }} p={2}>
          <MultiConnect />
        </Box>
      )}
      <Box sx={{ padding: '34px 50px 0 50px', backgroundColor: '#E5E5E5' }} padding={2}>
        <TokenSelection
          token={token.ethereumSymbol}
          onTokenSelect={onTokenChange}
          blockchainTarget={SupportedBlockchain.Tezos}
          tokens={tokens}
          disabled={false}
        />
        <AmountToWrapInput
          balance={balance.value}
          balanceLoading={balance.loading}
          decimals={token.decimals}
          symbol={token.tezosSymbol}
          onChange={onAmountChange}
          amountToWrap={amount}
          disabled={!connected}
        />
      </Box>
      <Box sx={{ padding: '16px 0', backgroundColor: '#E5E5E5' }}>
        <AssetSummary
          label={'You will receive'}
          value={amount.minus(currentFees)}
          symbol={token.ethereumSymbol}
          decimals={token.decimals}
        />
      </Box>
      <Box sx={{
        borderRadius: '0 0 10px 10px',
        minHeight: '40px',
        padding: '50px 30px',
        backgroundColor: '#E5E5E5'
      }}>
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
      </Box>
    </>
  );
}
