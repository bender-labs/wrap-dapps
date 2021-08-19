import { formatOptions } from '../formatting';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import React from 'react';
import { styled, TextField } from '@material-ui/core';

const Wrapper = styled('div')(() => ({
  width: '100%',
  textAlign: 'center',
  padding: '30px 0',
  '& input': {
    fontFamily: 'inherit',
    textAlign: 'center',
    fontSize: 42
  }
}));

const StyledNumberFormat = styled(NumberFormat)(() => ({
  fontSize: 52,
  textAlign: 'center'
}));

export type AmountInputProps = {
  value: string | number;
  symbol: string;
  decimals: number;
  onChange: (v: string) => void;
  error?: boolean;
  helperText?: React.ReactNode;
  focus?: boolean;
};

export default function AmountInput({
                                      symbol,
                                      value,
                                      decimals,
                                      onChange,
                                      error,
                                      helperText,
                                      focus = false
                                    }: AmountInputProps) {
  const handleOnChange = (e: NumberFormatValues) => {
    onChange(e.value);
  };

  return (
    <Wrapper>
      <StyledNumberFormat
        displayType='input'
        placeholder={`0 ${symbol}`}
        autoFocus={focus}
        suffix={` ${symbol}`}
        value={value}
        decimalScale={decimals}
        customInput={TextField}
        fullWidth
        error={error}
        helperText={helperText}
        variant={'filled'}
        onValueChange={handleOnChange}
        {...formatOptions}
      />
    </Wrapper>
  );
}