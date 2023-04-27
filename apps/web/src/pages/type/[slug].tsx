import { Typography } from "@mui/material";
import { ServiceDto, ServiceSchemaCategoryDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { getServiceSchemaCategoryById } from "clients/service-schema-categories.client";
import { getServicesWithOperatorsBySchemaCategoryId } from "clients/services.client";
import { SeoHead } from "components/screens/site/lib/seo-head";
import { Titled } from "components/lib/titled";
import { UserLayoutContainer } from "components/screens/site/lib/user-layout-container";
import { UserServicesView } from "components/screens/site/lib/user-services-view";

interface Props {
  schemaCategory: ServiceSchemaCategoryDto;
  services: ServiceDto[];
}

const ServiceTypePage: NextPage<Props> = ({ schemaCategory, services }) => {
  return (
    <UserLayoutContainer>
      <SeoHead
        subtitle={schemaCategory.name}
        description={schemaCategory.description || ""}
      />

      <UserLayoutContainer>
        <Titled title={schemaCategory.pluralName || ""}>
          <Typography>{schemaCategory.description || ""}</Typography>
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
  const schemaCategoryId = slug.split("-").pop();

  if (!schemaCategoryId) {
    return {
      notFound: true,
    };
  }

  try {
    const schemaCategory = await getServiceSchemaCategoryById(schemaCategoryId);
    const services = await getServicesWithOperatorsBySchemaCategoryId(
      schemaCategoryId
    );

    return {
      props: {
        schemaCategory,
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
