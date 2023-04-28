import { NextPage } from "next";
import * as React from "react";

import { ServiceSchemaCreate } from "components/admin/schemas/service-schema-create";

const ServiceSchemaCreatePage: NextPage = () => {
  return <ServiceSchemaCreate />;
};

ServiceSchemaCreatePage.getInitialProps = () => ({});

export default ServiceSchemaCreatePage;
