import theme from './theme';
import { PropsWithChildren } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

export default function MyThemeProvider({ children }: PropsWithChildren<{}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
