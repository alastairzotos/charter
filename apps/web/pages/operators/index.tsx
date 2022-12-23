import React from 'react';
import { OperatorDto } from 'dtos';
import { GetServerSideProps, NextPage } from 'next';
import { OperatorsService } from '../../src/services/operators.service';
import { UserOperatorsList } from '../../src/components/user-operators-list';
import { Typography } from '@mui/material';

interface Props {
  operators: OperatorDto[];
}

const OperatorsPage: NextPage<Props> = ({ operators }) => {
  return (
    <>
      <Typography variant="h6">Tour operators</Typography>
      <UserOperatorsList operators={operators} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const svc = new OperatorsService();

  return {
    props: {
      operators: await svc.getOperators()
    }
  }
}

export default OperatorsPage;
