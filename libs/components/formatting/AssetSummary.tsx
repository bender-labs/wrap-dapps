import BigNumber from 'bignumber.js';
import { styled, Typography } from '@material-ui/core';
import React from 'react';
import NumberFormat from 'react-number-format';
import { formatOptions } from './numberFormat';

const Summary = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#343434',
  color: '#FFFFFF',
  padding: '10px 20px'
}));

const Wrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 26px'
}));

const StyledTypography = styled(Typography)(() => ({
  width: '35%',
  fontSize: 12
}));

const StyledNumberFormat = styled(NumberFormat)(() => ({
  flexGrow: 2,
  color: '#FFD000',
  fontSize: 20,
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end',
  textAlign: 'right'
}));

export type AssetSummaryProps = {
  label: string;
  value: BigNumber;
  decimals: number;
  symbol: string;
};

export function AssetSummary({
                               label,
                               symbol,
                               value,
                               decimals
                             }: AssetSummaryProps) {
  return (
    <Summary>
      <Wrapper>
        <StyledTypography component='span'>
          {label}
        </StyledTypography>
        <StyledNumberFormat displayType='text' suffix={` ${symbol}`}
                            {...formatOptions}
                            value={value.shiftedBy(-decimals).toString()}
        />
      </Wrapper>
    </Summary>
  );
}
