import React from 'react';
import BigNumber from 'bignumber.js';
import { styled, TextField } from '@mui/material';
import { formatOptions } from '@wrap-dapps/components';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { WrapUnstakeInfo } from '../WrapStackingUnstake';

const StyledNumberFormat = styled(NumberFormat)(() => ({
  textAlign: 'center',
  padding: 0
}));

interface WrapStackingDenseAmountProps {
  wrapUnstakeInfo: WrapUnstakeInfo;
  decimals: number;
  onChange: (v: string) => void;
}

export function WrapStackingDenseAmount({ wrapUnstakeInfo, decimals, onChange }: WrapStackingDenseAmountProps) {

  const handleOnChange = (e: NumberFormatValues) => {
    onChange(new BigNumber(e.value).shiftedBy(decimals).toString(10));
  };

  return <StyledNumberFormat
    displayType='input'
    value={wrapUnstakeInfo.amount.shiftedBy(-decimals).toString(10)}
    decimalScale={decimals}
    customInput={TextField}
    size='small'
    label={'max ' + wrapUnstakeInfo.maxAmount.shiftedBy(-decimals).toString(10)}
    variant={'outlined'}
    error={wrapUnstakeInfo.amount.isGreaterThan(wrapUnstakeInfo.maxAmount)}
    onValueChange={handleOnChange}
    {...formatOptions}
  />;
}