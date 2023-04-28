import { NextPage } from "next";
import * as React from "react";

import { ServiceSchemaCategoryCreate } from "components/admin/schema-categories/service-schema-category-create";

const ServiceSchemaCategoryCreatePage: NextPage = () => {
  return <ServiceSchemaCategoryCreate />;
};

ServiceSchemaCategoryCreatePage.getInitialProps = () => ({});

export default ServiceSchemaCategoryCreatePage;
