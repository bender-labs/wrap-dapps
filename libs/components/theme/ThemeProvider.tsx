import theme from './theme';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

export default function MyThemeProvider({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </>
  );
}
