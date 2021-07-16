import React from 'react';
import { AppBar, Box, Toolbar } from '@material-ui/core';
import { EthereumConnectionButton, TezosConnectionButton } from '../wallet';

export function NavBar() {
  return (
    <AppBar>
      <Toolbar>
        <Box style={{padding: "25px"}}>
          <TezosConnectionButton />
        </Box>
        <Box>
          <EthereumConnectionButton />
        </Box>

      </Toolbar>
    </AppBar>
  );
}
