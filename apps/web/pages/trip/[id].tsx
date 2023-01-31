import { OperatorDto, TripDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { OperatorLayout } from "src/components/operator-layout";
import { SeoHead } from "src/components/seo/head";
import { UserTripView } from "src/components/user-trip-view";
import { TripsService } from "src/services/trips.service";

interface Props {
  trip: TripDto;
  operator: OperatorDto;
}

const TripPage: NextPage<Props> = ({ trip, operator }) => {
  return (
    <>
      <SeoHead
        subtitle={`${trip.name} by ${operator.name}`}
        description={trip.description}
      />
      <OperatorLayout operator={operator}>
        <UserTripView trip={trip} operator={operator} />
      </OperatorLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const id = params?.id as string;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const tripsService = new TripsService();

  try {
    const { trip, operator } = await tripsService.getTripByIdWithOperator(id);

    return {
      props: {
        trip,
        operator,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default TripPage;
