import { NextPage } from "next";
import * as React from "react";

import { ServiceSchemaCategoryList } from "components/admin/schema-categories/service-schema-categories-list";

const ServiceSchemaCategoriesPage: NextPage = () => {
  return <ServiceSchemaCategoryList />;
};

ServiceSchemaCategoriesPage.getInitialProps = () => ({});

export default ServiceSchemaCategoriesPage;
