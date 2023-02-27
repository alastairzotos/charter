import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { ServiceSchemaCreate } from "src/components/service-schema-create";

const ServiceSchemaCreatePage: React.FC = () => {
  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          { href: urls.admin.serviceSchemas(), title: "Service schemas" },
        ]}
        current="Create service schema"
      />

      <ServiceSchemaCreate />
    </>
  );
};

export default ServiceSchemaCreatePage;
