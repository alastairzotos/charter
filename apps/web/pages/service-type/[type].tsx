import { Typography } from "@mui/material";
import { getServiceTypeLabel, ServiceDto, ServiceType } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { getSchemaForServiceType } from "service-schemas";

import { SeoHead } from "src/components/seo/head";
import { Titled } from "src/components/titled";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { UserServicesView } from "src/components/user-services-view";
import { ServicesService } from "src/services/services.service";
import { pluralize } from "src/util/misc";

interface Props {
  type: ServiceType;
  services: ServiceDto[];
}

const ServiceTypePage: NextPage<Props> = ({ type, services }) => {
  return (
    <UserLayoutContainer>
      <SeoHead
        subtitle={getServiceTypeLabel(type)}
        description={getSchemaForServiceType(type)?.description || ""}
      />

      <UserLayoutContainer>
        <Titled title={pluralize(2, getServiceTypeLabel(type))}>
          <Typography>
            {getSchemaForServiceType(type)?.description || ""}
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
    const servicesService = new ServicesService();
    const services = await servicesService.getServicesWithOperatorsByType(type);

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
