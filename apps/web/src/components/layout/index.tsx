import * as React from 'react';
import { AppBar } from '../app-bar';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar />
      {children}
    </>
  )
}
