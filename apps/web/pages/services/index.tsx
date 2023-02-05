import { serviceTypes } from "dtos";
import { NextPage } from "next";
import { getSchemaForServiceType } from "service-schemas";

import { SeoHead } from "src/components/seo/head";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { ServiceTypes } from "src/components/user-service-types";

const ServicesPage: NextPage = () => {
  const serviceList = serviceTypes
    .filter((type) => type !== "none")
    .map((type) =>
      getSchemaForServiceType(type).pluralLabel.toLocaleLowerCase()
    );

  return (
    <>
      <SeoHead
        subtitle={"Available services"}
        description={`Easily book ${serviceList.join(
          ", "
        )}, and other services in Corfu`}
      />

      <UserLayoutContainer>
        <ServiceTypes />
      </UserLayoutContainer>
    </>
  );
};

export default ServicesPage;
