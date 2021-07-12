import theme from './theme';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

export default function MyThemeProvider({ children }: PropsWithChildren<{}>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
