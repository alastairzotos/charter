import React from 'react';
import { OperatorDto, TripDto } from 'dtos';
import { GetServerSideProps, NextPage } from 'next';
import { OperatorLayout } from '../../src/components/operator-layout';
import { TripsService } from '../../src/services/trips.service';
import { UserTripView } from '../../src/components/user-trip-view';

interface Props {
  trip: TripDto;
  operator: OperatorDto;
}

const TripPage: NextPage<Props> = ({ trip, operator }) => {
  return (
    <OperatorLayout operator={operator}>
      <UserTripView trip={trip} operator={operator} />
    </OperatorLayout>
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

  try {
    const { trip, operator } = await tripsService.getTripByIdWithOperator(id);

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
