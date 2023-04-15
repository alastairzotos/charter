import { OperatorDto, ServiceDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { getServiceByIdWithOperator } from "src/clients/services.client";
import { SeoHead } from "src/components/seo/head";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { UserServiceView } from "src/components/user-service-view";

interface Props {
  service: ServiceDto;
  operator: OperatorDto;
}

const ServicePage: NextPage<Props> = ({ service, operator }) => {
  return (
    <UserLayoutContainer>
      <SeoHead
        subtitle={`${service.name} by ${operator.name}`}
        description={service.description}
      />

      <UserServiceView service={service} operator={operator} />
    </UserLayoutContainer>
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

  try {
    const { service, operator } = await getServiceByIdWithOperator(id);

    return {
      props: {
        service,
        operator,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default ServicePage;
