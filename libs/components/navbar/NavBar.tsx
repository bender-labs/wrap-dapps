import React, { PropsWithChildren } from 'react';
import { Box, Flex, NavLink } from 'theme-ui';

export default function NavBar({ children }: PropsWithChildren<{}>) {
  return (
    <Flex as="nav" sx={{ justifyContent: 'space-between' }} p={2}>
      <Flex sx={{ alignItems: 'center' }}>
        <div>
          <NavLink
            href="#!"
            sx={{
              p: '2',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              fontSize: '2',
            }}
          >
            LOGO
          </NavLink>
        </div>
        <NavLink href="#!" p={2}>
          Docs
        </NavLink>
        <NavLink href="#!" p={2}>
          Blog
        </NavLink>
      </Flex>
      <Box
        sx={{
          '& > :first-child': {
            mr: 2,
          },
        }}
      >
        {children}
      </Box>
    </Flex>
  );
}
