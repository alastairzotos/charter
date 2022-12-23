import { Avatar } from '@mui/material';
import { OperatorDto, TripDto } from 'dtos';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { OperatorsService } from '../../src/services/operators.service';
import { urls } from '../../src/urls';

interface Props {
  operator: OperatorDto;
  trips: TripDto[];
}

const OperatorPage: NextPage<Props> = ({ operator, trips }) => {
  return (
    <>
      <div>
        <h5>Operator</h5>
        <Avatar src={operator.photo} />
        <p>{operator.name}</p>
        <p>{operator.email}</p>
        <p>{operator.phoneNumber}</p>
        <p>{operator.address}</p>
      </div>

      <div>
        <h5>Trips</h5>
        <ul>
          {
            trips.map(trip => (
              <li key={trip._id}>
                <Link href={urls.user.trip(trip)}>{trip.name}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return {
      notFound: true
    }
  }

  const operatorId = slug.split('-').pop()!;

  const operatorsService = new OperatorsService();

  try {
    const { operator, trips } = await operatorsService.getOperatorWithTripsById(operatorId);

    return {
      props: {
        operator,
        trips
      }
    }
  } catch {
    return {
      notFound: true
    }
  }
}

export default OperatorPage;
