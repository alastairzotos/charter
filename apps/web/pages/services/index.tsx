import { ServiceDto, ServiceSchemaCategoryDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";

import { getServiceSchemaCategories } from "src/clients/service-schema-categories.client";
import { getPopularServices } from "src/clients/services.client";
import { PopularServices } from "src/components/popular-services";
import { SeoHead } from "src/components/seo/head";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { ServiceCategories } from "src/components/user-service-categories";

interface Props {
  schemaCategories: ServiceSchemaCategoryDto[];
  popularServices: ServiceDto[];
}

const ServicesPage: NextPage<Props> = ({
  schemaCategories,
  popularServices,
}) => {
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

      <UserLayoutContainer alternative>
        <PopularServices services={popularServices} />
      </UserLayoutContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      schemaCategories: await getServiceSchemaCategories(),
      popularServices: await getPopularServices(),
    },
  };
};

export default ServicesPage;
