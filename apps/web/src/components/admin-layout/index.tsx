import * as React from 'react';
import { AdminAppBar } from '../admin-app-bar';

export const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AdminAppBar />
      {children}
    </>
  )
}
