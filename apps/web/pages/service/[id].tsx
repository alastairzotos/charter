import { OperatorDto, ServiceDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { OperatorLayout } from "src/components/operator-layout";
import { SeoHead } from "src/components/seo/head";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { UserServiceView } from "src/components/user-service-view";
import { ServicesService } from "src/services/services.service";

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
      <OperatorLayout operator={operator}>
        <UserServiceView service={service} operator={operator} />
      </OperatorLayout>
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

  const servicesService = new ServicesService();

  try {
    const { service, operator } =
      await servicesService.getServiceByIdWithOperator(id);

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
