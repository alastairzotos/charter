import { ServiceSchemaCategoryDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";

import { getServiceSchemaCategories } from "clients/service-schema-categories.client";
import { SeoHead } from "components/_core/seo-head";
import { UserLayoutContainer } from "components/_core/user-layout-container";
import { ServiceCategories } from "components/_core/user-service-categories";

interface Props {
  schemaCategories: ServiceSchemaCategoryDto[];
}

const ServicesPage: NextPage<Props> = ({ schemaCategories }) => {
  const serviceList = schemaCategories
    .map((category) => category.pluralName.toLocaleLowerCase())
    .join(", ");

  return (
    <>
      <SeoHead
        subtitle={"Available services"}
        description={`Easily book ${serviceList}, and other services in Corfu`}
      />

      <UserLayoutContainer>
        <ServiceCategories schemaCategories={schemaCategories} />
      </UserLayoutContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      schemaCategories: await getServiceSchemaCategories(),
    },
  };
};

export default ServicesPage;
