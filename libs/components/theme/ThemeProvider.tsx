import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import { PropsWithChildren } from 'react';

export default function (props: PropsWithChildren<{}>) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
