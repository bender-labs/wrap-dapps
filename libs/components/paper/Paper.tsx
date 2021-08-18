import { Box, PaperProps, styled } from '@material-ui/core';
import * as React from 'react';
import { PropsWithChildren } from 'react';

export type WrapPaperProps = PaperProps;

interface StyledHeaderProps {
  extraPadding: boolean;
}

const StyledHeader = styled('header', {
  shouldForwardProp: (prop) => prop !== 'extraPadding'
})<StyledHeaderProps>(({ extraPadding, theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: extraPadding ? theme.spacing(2.5) : theme.spacing(),
  paddingBottom: theme.spacing(),
  paddingLeft: theme.spacing(),
  paddingRight: theme.spacing(),
  backgroundColor: '#E5E5E5',
  fontSize: '20px',
  fontWeight: 'bold',
  boxShadow: 'inset 0 -7px 9px -7px rgba(0,0,0,0.4)'
}));

export const PaperHeader = ({ extraPadding = false, children }: PropsWithChildren<{ extraPadding?: boolean }>) => {
  return (
    <StyledHeader extraPadding={extraPadding}>
      {children}
    </StyledHeader>
  );
};

export const PaperTitle = styled('div')({
  justifySelf: 'center',
  textAlign: 'center',
  width: '100%'
});

export const PaperNav = styled('div')({
  justifySelf: 'flex-start',
  minWidth: 72
});

export const PaperActions = styled('div')({
  justifySelf: 'flex-end',
  minWidth: 72,
  '& > *': {
    margin: '0 4px',
    '&:first-child': {
      marginLeft: 0
    },
    '&:last-child': {
      marginRight: 0
    }
  }
});

export const PaperFooter = styled('div')({
  minHeight: '60px',
  padding: '20px 90px',
  textAlign: 'center',
  borderRadius: '0 0 10px 10px',
  backgroundColor: '#E5E5E5'
});

export function PaperContent(
  props: React.HTMLAttributes<HTMLDivElement> & {
    alternate?: boolean;
  }) {
  const { className, alternate = false, ...rest } = props;
  return <Box sx={alternate ? { backgroundColor: '#C4C4C4' } : { backgroundColor: '#E5E5E5' }} p={2} {...rest} />;
}
