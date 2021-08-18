import { JSXElementConstructor } from 'react';

export type AppRoute = {
  name: string;
  component: JSXElementConstructor<any>;
  path: string;
  external: boolean;
}