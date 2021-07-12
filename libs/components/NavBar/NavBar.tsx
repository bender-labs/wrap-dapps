import React, { PropsWithChildren } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

export function NavBar({ children }: PropsWithChildren<{}>) {
  return (
    <AppBar position={'static'} variant={'outlined'} color={'secondary'}>
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
}
