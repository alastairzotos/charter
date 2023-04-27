import { Grid } from "@mui/material";
import { OperatorDto, ServiceDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { getOperatorWithServicesBySlug } from "clients/operators.client";
import { SeoHead } from "components/_core/seo-head";
import { UserLayoutContainer } from "components/_core/user-layout-container";
import { UserServicesView } from "components/_core/user-services-view";
import { OperatorCard } from "components/operators/operator-card";

interface Props {
  operator: OperatorDto;
  services: ServiceDto[];
}

const OperatorPage: NextPage<Props> = ({ operator, services }) => {
  return (
    <UserLayoutContainer>
      <SeoHead
        subtitle={operator.name}
        description={`View details and services offered by ${operator.name}`}
      />
      <Grid container>
        <Grid item xs={12} lg={4} sx={{ p: 2 }}>
          <OperatorCard operator={operator} />
        </Grid>

        <Grid item xs={12} lg={8} sx={{ p: 2 }}>
          <UserServicesView services={services} groupByType />
        </Grid>
      </Grid>
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

  try {
    const { operator, services } = await getOperatorWithServicesBySlug(slug);

    return {
      props: {
        operator,
        services,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default OperatorPage;
