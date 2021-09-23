import React from 'react';
import BigNumber from 'bignumber.js';
import { styled, TextField } from '@mui/material';
import { formatOptions } from '@wrap-dapps/components';
import NumberFormat, { NumberFormatValues } from 'react-number-format';


const StyledNumberFormat = styled(NumberFormat)(() => ({
  // fontSize: 52,
  textAlign: 'center'
}));

interface WrapStackingDenseAmountProps {
  amount: BigNumber;
  decimals: number;
  onChange: (v: string) => void;
}

export function WrapStackingDenseAmount({ amount, decimals, onChange }: WrapStackingDenseAmountProps) {

  const handleOnChange = (e: NumberFormatValues) => {
    onChange(e.value);
  };

  return <StyledNumberFormat
    displayType='input'
    value={amount.toString(10)}
    decimalScale={decimals}
    customInput={TextField}
    fullWidth
    variant={'outlined'}
    onValueChange={handleOnChange}
    {...formatOptions}
  />;
}