import { OperatorDto, TripDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { OperatorLayout } from "src/components/operator-layout";
import { SeoHead } from "src/components/seo/head";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { UserTripsView } from "src/components/user-trips-view";
import { OperatorsService } from "src/services/operators.service";

interface Props {
  operator: OperatorDto;
  trips: TripDto[];
}

const OperatorPage: NextPage<Props> = ({ operator, trips }) => {
  return (
    <UserLayoutContainer>
      <SeoHead
        subtitle={operator.name}
        description={`View details and trips by ${operator.name}`}
      />
      <OperatorLayout operator={operator}>
        <UserTripsView trips={trips} />
      </OperatorLayout>
    </UserLayoutContainer>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const slug = params?.slug as string;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const operatorId = slug.split("-").pop()!;

  const operatorsService = new OperatorsService();

  try {
    const { operator, trips } = await operatorsService.getOperatorWithTripsById(
      operatorId
    );

    return {
      props: {
        operator,
        trips,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default OperatorPage;
