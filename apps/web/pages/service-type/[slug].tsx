import { Typography } from "@mui/material";
import { ServiceDto, ServiceSchemaDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { getServiceSchemaById } from "src/clients/service-schemas.client";
import { getServicesWithOperatorsBySchemaId } from "src/clients/services.client";
import { SeoHead } from "src/components/seo/head";
import { Titled } from "src/components/titled";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { UserServicesView } from "src/components/user-services-view";

interface Props {
  serviceSchema: ServiceSchemaDto;
  services: ServiceDto[];
}

const ServiceTypePage: NextPage<Props> = ({ serviceSchema, services }) => {
  return (
    <UserLayoutContainer>
      <SeoHead
        subtitle={serviceSchema.label}
        description={serviceSchema.description || ""}
      />

      <UserLayoutContainer>
        <Titled title={serviceSchema.pluralLabel || ""}>
          <Typography>{serviceSchema.description || ""}</Typography>
        </Titled>

        <UserServicesView showOperator services={services} />
      </UserLayoutContainer>
    </UserLayoutContainer>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const schemaId = slug.split("-").pop();

  if (!schemaId) {
    return {
      notFound: true,
    };
  }

  try {
    const serviceSchema = await getServiceSchemaById(schemaId);
    const services = await getServicesWithOperatorsBySchemaId(schemaId);

    return {
      props: {
        serviceSchema,
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
