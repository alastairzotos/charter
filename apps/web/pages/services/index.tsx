import { ServiceSchemaDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";

import { getServiceSchemas } from "src/clients/service-schemas.client";
import { SeoHead } from "src/components/seo/head";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { ServiceTypes } from "src/components/user-service-types";

interface Props {
  serviceSchemas: ServiceSchemaDto[];
}

const ServicesPage: NextPage<Props> = ({ serviceSchemas }) => {
  const serviceList = serviceSchemas
    .map((schema) => schema.pluralLabel.toLocaleLowerCase())
    .join(", ");

  return (
    <>
      <SeoHead
        subtitle={"Available services"}
        description={`Easily book ${serviceList}, and other services in Corfu`}
      />

      <UserLayoutContainer>
        <ServiceTypes serviceSchemas={serviceSchemas} />
      </UserLayoutContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      serviceSchemas: await getServiceSchemas(),
    },
  };
};

export default ServicesPage;
