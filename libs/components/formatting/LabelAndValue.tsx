import { styled, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

const Root = styled('div')(() => ({
  padding: '10px 20px'
}));

const Wrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const StyledLabel = styled(Typography)(() => ({
  width: '35%',
  fontSize: 12,
  fontWeight: 'bold'
}));

const ValueWrapper = styled('div')(() => ({
  flexGrow: 1,
  fontSize: 12,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end',
  textAlign: 'left'
}));

export type LabelAndValueProps = {
  label: string;
  value: string | ReactNode;
};

export function LabelAndValue({ label, value }: LabelAndValueProps) {
  return (
    <Root>
      <Wrapper>
        <StyledLabel component='span'>
          {label}
        </StyledLabel>
        <ValueWrapper>
          {value}
        </ValueWrapper>
      </Wrapper>
    </Root>
  );
}
