import React, { PropsWithChildren } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

export function NavBar({ children }: PropsWithChildren<{}>) {
  return (
    <AppBar position={'static'} color={'transparent'} elevation={0}>
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
}
