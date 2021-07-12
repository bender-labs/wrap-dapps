import React, { PropsWithChildren } from 'react';
import { Box, Heading } from 'theme-ui';

type Props = {};

export function List({ children }: PropsWithChildren<Props>) {
  return (
    <Box
      as="ul"
      p={0}
      sx={{
        borderRadius: 'md',
        listStyleType: 'none',
        backgroundColor: 'background',
        color: 'text',
      }}
    >
      {children}
    </Box>
  );
}

type ItemProps = { button?: false } | { button: true; onClick: () => void };

export function ListHeader({ text }: { text: string }) {
  return (
    <Heading p={10} sx={{ textAlign: 'center' }}>
      {text}
    </Heading>
  );
}

export function ListItem(props: PropsWithChildren<ItemProps>) {
  const { children, button } = props;
  return (
    <Box
      as="li"
      p={2}
      sx={{
        borderTop: '1px solid',
        borderColor: 'grey',

        ...(button && {
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'grey',
          },
        }),
      }}
      onClick={
        props.button
          ? () => {
              props.onClick();
            }
          : undefined
      }
    >
      {children}
    </Box>
  );
}
