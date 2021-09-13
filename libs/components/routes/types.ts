import React from 'react';

export type AppRoute = {
  name?: string;
  component: React.ComponentType<any>;
  path: string;
  external: boolean | false;
  navRoute: boolean | false;
}