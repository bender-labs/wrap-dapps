import { Button, CircularProgress, styled } from '@mui/material';
import React, { PropsWithChildren } from 'react';

export type LoadableButtonProps = {
  loading: boolean;
  onClick: () => void;
  disabled: boolean;
  text: string;
  isChecked?: boolean;
  finalized?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
};

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12,
  zIndex: 99
}));

const MyWrapper = styled('div')(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: '#FFFFFF',
  position: 'relative',
  borderRadius: '25px'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  boxShadow: 'none',
  fontWeight: 900,
  borderRadius: '25px',
  border: 'none',
  backgroundColor: '#FFFFFF',
  color: '#000000',
  '&:hover': {
    border: 'none',
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
  },
  '&.Mui-disabled': {
    border: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  }
}));

export function LoadableButton({
                                 loading,
                                 disabled,
                                 text,
                                 onClick,
                                 children,
                                 finalized,
                                 variant = 'outlined',
                                 size
                               }: PropsWithChildren<LoadableButtonProps>) {

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onClick();
  };

  return (
    <div>
      <MyWrapper>
        <StyledButton variant={variant} fullWidth disabled={disabled || loading} onClick={handleOnClick} size={size}
                      sx={finalized ? {
                        '&.Mui-disabled': {
                          backgroundColor: 'palette.primary.main'
                        }
                      } : {}}>
          {text}
        </StyledButton>
        {loading && (
          <StyledCircularProgress size={24} />
        )}
      </MyWrapper>
      {children}
    </div>
  );
}
