import { OperatorDto, TripDto } from 'dtos';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { OperatorsService } from '../../src/services/operators.service';
import { TripsService } from '../../src/services/trips.service';
import { urls } from '../../src/urls';

interface Props {
  trip: TripDto;
  operator: OperatorDto;
}

const TripPage: NextPage<Props> = ({ trip, operator }) => {
  return (
    <>
      <Link href={urls.user.operator(operator)}>{operator.name}</Link>
      <p>{trip.name}</p>
      <p>{trip.description}</p>
      <p>{trip.duration}</p>
      <p>{trip.startLocation}</p>
      <p>{trip.startTime}</p>
      {
        trip.photos.map(url => (
          <div key={url} style={{ position: 'relative', width: 200, height: 200 }}>
            <Image alt={operator.name + ' Trip'} src={url} fill style={{ objectFit: 'cover' }} />
          </div>
        ))
      }
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const id = params?.id as string;

  if (!id) {
    return {
      notFound: true
    }
  }

  const tripsService = new TripsService();
  const operatorsService = new OperatorsService();

  try {
    const trip = await tripsService.getTrip(id);
    const operator = await operatorsService.getOperator(trip.operator as unknown as string);

    return {
      props: {
        trip,
        operator
      }
    }
  } catch {
    return {
      notFound: true
    }
  }
}

export default TripPage;