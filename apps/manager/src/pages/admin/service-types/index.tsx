import { NextPage } from "next";
import * as React from "react";

import { ServiceTypesList } from "components/admin/service-types/service-types-list";

const ServiceTypesPage: NextPage = () => {
  return <ServiceTypesList />;
};

ServiceTypesPage.getInitialProps = () => ({});

export default ServiceTypesPage;
