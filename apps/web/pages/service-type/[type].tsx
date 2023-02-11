import { Typography } from "@mui/material";
import { ServiceDto, ServiceType } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { getSchemaForServiceType } from "service-schemas";

import { getServicesWithOperatorsByType } from "src/clients/services.client";
import { SeoHead } from "src/components/seo/head";
import { Titled } from "src/components/titled";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { UserServicesView } from "src/components/user-services-view";

interface Props {
  type: ServiceType;
  services: ServiceDto[];
}

const ServiceTypePage: NextPage<Props> = ({ type, services }) => {
  return (
    <UserLayoutContainer>
      <SeoHead
        subtitle={getSchemaForServiceType(type).label}
        description={getSchemaForServiceType(type).description || ""}
      />

      <UserLayoutContainer>
        <Titled title={getSchemaForServiceType(type).pluralLabel || ""}>
          <Typography>
            {getSchemaForServiceType(type).description || ""}
          </Typography>
        </Titled>

        <UserServicesView showOperator services={services} />
      </UserLayoutContainer>
    </UserLayoutContainer>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const type = params?.type as ServiceType;

  if (!type) {
    return {
      notFound: true,
    };
  }

  try {
    const services = await getServicesWithOperatorsByType(type);

    return {
      props: {
        type,
        services,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default ServiceTypePage;
