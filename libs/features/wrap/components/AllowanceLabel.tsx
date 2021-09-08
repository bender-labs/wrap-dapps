import { styled, Typography } from '@mui/material';
import React from 'react';
import BigNumber from 'bignumber.js';
import { formatOptions } from '@wrap-dapps/components';
import NumberFormat from 'react-number-format';

type Props = {
  currentAllowance: BigNumber;
  balanceToWrap: BigNumber;
  decimals: number;
  symbol: string;
};

const HelperText = styled(Typography)(() => ({
  color: '#000000',
  display: 'block',
  position: 'relative',
  fontWeight: 400,
  fontSize: 10
}));

export function AllowanceLabel({
                                         currentAllowance,
                                         balanceToWrap,
                                         decimals,
                                         symbol
                                       }: Props) {
  return (
    <div>
      <HelperText variant='caption'>
        Current Allowance:{' '}
        <NumberFormat
          displayType='text'
          suffix={` ${symbol}`}
          {...formatOptions}
          value={currentAllowance.shiftedBy(-decimals).toString()}
        />
      </HelperText>
      <HelperText variant='caption'>
        The locking contract will be allowed to spend{' '}
        <NumberFormat
          displayType='text'
          suffix={` ${symbol}`}
          {...formatOptions}
          value={balanceToWrap.shiftedBy(-decimals).toString()}
        />{' '}
        on your behalf.
      </HelperText>
    </div>
  );
}
