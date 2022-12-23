import React from 'react';
import { OperatorDto } from 'dtos';
import { GetServerSideProps, NextPage } from 'next';
import { OperatorsService } from '../../src/services/operators.service';
import Link from 'next/link';
import { urls } from '../../src/urls';

interface Props {
  operators: OperatorDto[];
}

const OperatorsPage: NextPage<Props> = ({ operators }) => {
  return (
    <>
      {
        operators.map(o => (
          <p key={o._id}>
            <Link href={urls.user.operator(o)}>
              {o.name}
            </Link>
          </p>
        ))
      }
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
