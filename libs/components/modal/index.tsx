import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { Box, Flex } from 'theme-ui';
import { alpha } from '@theme-ui/color';

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export function Modal({ isOpen, onClose, children }: PropsWithChildren<Props>) {
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
          <Box mx={'auto'} sx={{}} onClick={(e) => e.stopPropagation()}>
            {children}
          </Box>
        </Flex>
      </Box>
    </>,
    document.body
  );
}
