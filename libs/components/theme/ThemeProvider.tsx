import theme from './theme';
import { PropsWithChildren } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

export default function MyThemeProvider({ children }: PropsWithChildren<{}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
