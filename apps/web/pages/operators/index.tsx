import React from 'react';
import { OperatorDto } from 'dtos';
import { GetServerSideProps, NextPage } from 'next';
import { OperatorsService } from '../../src/services/operators.service';
import { UserOperatorsList } from '../../src/components/user-operators-list';
import { Typography } from '@mui/material';
import { SeoHead } from '../../src/components/seo/head';

interface Props {
  operators: OperatorDto[];
}

const OperatorsPage: NextPage<Props> = ({ operators }) => {
  return (
    <>
      <SeoHead subtitle="Operators" description="View list of available operators" />
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
