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
import { Checkbox, IconButton, Typography } from '@mui/material';
import React from 'react';
import BigNumber from 'bignumber.js';
import { unwrapERC20AmountsFromTotal } from '../../fees/fees';
import { Fees, FungibleToken } from '@wrap-dapps/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UnwrapActions from './UnwrapActions';
import { UnwrapStatus } from '../hooks';

export type UnwrapConfirmStepProps = {
  token: FungibleToken;
  fees: Fees;
  sendingAddress: string;
  recipientAddress: string;
  amount: BigNumber;
  networkCost?: number;
  onPrevious: () => void;
  status: UnwrapStatus;
  onUnwrap: () => void;
  onAgreementChange: (v: boolean) => void;
};

export default function UnwrapConfirmStep({
                                            onPrevious,
                                            amount,
                                            fees,
                                            token,
                                            status,
                                            sendingAddress,
                                            recipientAddress,
                                            onUnwrap,
                                            networkCost,
                                            onAgreementChange
                                          }: UnwrapConfirmStepProps) {
  const [, currentFees] = unwrapERC20AmountsFromTotal(amount, fees);

  const [checked, setChecked] = React.useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
    onAgreementChange(e.target.checked);
  }

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
        <Typography
          variant={'body2'}
          style={{ paddingLeft: '20px', fontWeight: 'bold' }}
        >
          Details
        </Typography>
        <LabelAndAsset
          label={'Send'}
          decimals={token.decimals}
          value={amount}
          symbol={token.tezosSymbol}
        />
        <LabelAndValue label={'From'} value={sendingAddress} />
        <LabelAndValue label={'To'} value={recipientAddress} />
      </PaperContent>
      <PaperContent style={{ backgroundColor: '#C4C4C4' }}>
        <Typography
          variant={'body2'}
          style={{ paddingLeft: '20px', fontWeight: 'bold' }}
        >
          Fees
        </Typography>
        <LabelAndAsset
          label={'Unwrap fees'}
          decimals={token.decimals}
          value={currentFees}
          symbol={token.tezosSymbol}
        />
        <LabelAndAsset
          label={'Network fees'}
          decimals={6}
          value={new BigNumber(networkCost || 0)}
          symbol={'tez'}
        />
      </PaperContent>
      <PaperContent style={{ padding: '0' }}>
        <AssetSummary
          label={'You will receive'}
          value={amount.minus(currentFees)}
          decimals={token.decimals}
          symbol={token.ethereumSymbol}
        />
      </PaperContent>
      <PaperContent style={{ display: 'flex', padding: '20px 26px 0px 26px' }}>
        <Checkbox checked={checked} onChange={handleChange} />
        <Typography variant={'caption'}>
          I acknowledge the fees and that this transaction will require ETH to
          finalize releasing
        </Typography>
      </PaperContent>
      <PaperContent
        style={{
          borderRadius: '0 0 10px 10px',
          minHeight: '60px',
          padding: '20px 90px'
        }}
      >
        <UnwrapActions onUnwrap={onUnwrap} status={status} />
      </PaperContent>
    </>
  );
}
