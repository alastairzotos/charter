import * as React from 'react';
import { AdminAppBar } from '../admin-app-bar';
import { SeoHead } from '../seo/head';

export const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SeoHead subtitle='Admin' description="Manage operators and bookings" />
      <AdminAppBar />
      {children}
    </>
  )
}
