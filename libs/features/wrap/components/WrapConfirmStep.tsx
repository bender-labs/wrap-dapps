import {
  AssetSummary,
  LabelAndAsset,
  LabelAndValue,
  PaperActions,
  PaperContent,
  PaperHeader,
  PaperNav,
  PaperTitle
} from '@wrap-dapps/components';
import { Box, Checkbox, IconButton, styled, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import BigNumber from 'bignumber.js';
import { wrapERC20Fees } from '../../fees/fees';
import { Fees, FungibleToken } from '@wrap-dapps/api';
import { WrapActions } from './WrapActions';
import { WrapStatus } from '../hooks';

const Description = styled(Typography)(() => ({
  paddingLeft: '20px',
  fontWeight: 'bold'
}));

const PaperAlternate = styled(Box)(({theme}) => ({
  padding: theme.spacing(2),
  backgroundColor: '#C4C4C4'
}));

const PaperWithoutPadding = styled(Box)(() => ({
  backgroundColor: '#E5E5E5',
  padding: '0'
}));

export type WrapConfirmStepProps = {
  token: FungibleToken;
  fees: Fees;
  sendingAddress: string;
  recipientAddress: string;
  amount: BigNumber;
  onPrevious: () => void;
  status: WrapStatus;
  currentAllowance: BigNumber;
  onAuthorize: () => void;
  onWrap: () => void;
  networkFees: BigNumber;
  onAgreementChange: (v: boolean) => void;
};

export function WrapConfirmStep({
                                  onPrevious,
                                  amount,
                                  fees,
                                  token,
                                  status,
                                  currentAllowance,
                                  sendingAddress,
                                  recipientAddress,
                                  onAuthorize,
                                  onWrap,
                                  networkFees,
                                  onAgreementChange
                                }: WrapConfirmStepProps) {
  const currentFees = wrapERC20Fees(amount, fees);

  const [checked, setChecked] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
    onAgreementChange(e.target.checked);
  }

  React.useEffect(() => {
    const check =
      status === WrapStatus.READY_TO_WRAP ||
      status === WrapStatus.WAITING_FOR_WRAP;
    setChecked(check);
    setDisabled(check);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PaperHeader>
        <PaperNav>
          <IconButton onClick={onPrevious}>
            <ArrowBackIcon />
          </IconButton>
        </PaperNav>
        <PaperTitle>Confirm</PaperTitle>
        <PaperActions />
      </PaperHeader>

      <PaperContent>
        <Description variant={'body2'}>
          Details
        </Description>
        <LabelAndAsset
          label={'Send'}
          decimals={token.decimals}
          value={amount}
          symbol={token.ethereumSymbol}
        />
        <LabelAndValue label={'From'} value={sendingAddress} />
        <LabelAndValue label={'To'} value={recipientAddress} />
      </PaperContent>
      <PaperAlternate>
        <Description variant={'body2'}>
          Fees
        </Description>
        <LabelAndAsset
          label={'Wrap fees'}
          decimals={token.decimals}
          value={currentFees}
          symbol={token.tezosSymbol}
        />
        <LabelAndAsset
          label={'Network fees (est.)'}
          decimals={18}
          value={networkFees}
          symbol={'ETH'}
          emptyState={networkFees.isNaN() || networkFees.lte(0)}
          emptyStatePlaceHolder={'Awaiting for allowance'}
        />
      </PaperAlternate>
      <PaperWithoutPadding>
        <AssetSummary
          label={'You will receive'}
          value={amount.minus(currentFees)}
          decimals={token.decimals}
          symbol={token.tezosSymbol}
        />
      </PaperWithoutPadding>
      <PaperContent style={{ display: 'flex', padding: '20px 26px 0px 26px' }}>
        <Checkbox
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
        />
        <Typography variant={'caption'}>
          I acknowledge the fees and that this transaction will require XTZ to
          finalize minting
        </Typography>
      </PaperContent>
      <WrapActions
        currentAllowance={currentAllowance}
        amountToWrap={amount}
        decimals={token.decimals}
        onAuthorize={onAuthorize}
        onWrap={onWrap}
        status={status}
        token={token.ethereumSymbol}
      />
    </>
  );
}
