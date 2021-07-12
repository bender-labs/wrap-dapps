import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import { PropsWithChildren } from 'react';

export default function MyThemeProvider({ children }: PropsWithChildren<{}>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
