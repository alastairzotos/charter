import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { ServiceSchemaCategoryCreate } from "src/components/service-schema-category-create";

const ServiceSchemaCategoryCreatePage: React.FC = () => {
  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          {
            href: urls.admin.serviceSchemaCategories(),
            title: "Service schema categories",
          },
        ]}
        current="Create service schema category"
      />

      <ServiceSchemaCategoryCreate />
    </>
  );
};

export default ServiceSchemaCategoryCreatePage;
