import TezosConnectionButton from '@wrap-dapps/components/wallet/tezos/TezosConnectionButton';
import React from 'react';
import { EthereumConnectionButton } from '@wrap-dapps/components/wallet/ethereum/EthereumConnectionButton';
import { Flex, NavLink, Box } from 'theme-ui';

export default function NavBar() {
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
      <Flex sx={{ justifyContent: 'space-between' }}>
        <TezosConnectionButton />
        <EthereumConnectionButton />
      </Flex>
    </Flex>
  );
}
