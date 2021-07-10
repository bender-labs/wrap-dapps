import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { Box, Flex, Themed } from 'theme-ui';
import { alpha } from '@theme-ui/color';

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

type TitleProps = {
  primary: string;
};

export function DialogTitle({ primary }: TitleProps) {
  return <Themed.h1>primary</Themed.h1>;
}

export function Dialog({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<Props>) {
  if (!isOpen) {
    return null;
  }
  const handleClick = () => {
    if (onClose) onClose();
  };
  return ReactDOM.createPortal(
    <>
      <Box
        onClick={handleClick}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: alpha('muted', 0.1),
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          }}
        >
          <Box
            mx={'auto'}
            sx={{ minWidth: '300px', width: '20vw' }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </Box>
        </Flex>
      </Box>
    </>,
    document.body
  );
}
