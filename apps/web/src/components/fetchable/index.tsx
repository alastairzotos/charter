import React from 'react';
import { FetchStatus } from '../../models';

interface Props {
  status?: FetchStatus;
  none?: React.ReactNode;
  fetching: React.ReactNode;
  success: React.ReactNode;
  error: React.ReactNode;
}

export const Fetchable: React.FC<Props> = ({ status, none, fetching, success, error }) => {
  return (
    <>
      {status == undefined && none}
      {status === 'fetching' && fetching}
      {status === 'success' && success}
      {status === 'error' && error}
    </>
  )
}
