import { NextPage } from "next";
import * as React from "react";

import { ServiceSchemaList } from "components/admin/schemas/service-schema-list";

const ServiceSchemasPage: NextPage = () => {
  return <ServiceSchemaList />;
};

ServiceSchemasPage.getInitialProps = () => ({});

export default ServiceSchemasPage;
