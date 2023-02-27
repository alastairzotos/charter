import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { ServiceSchemaCategoryList } from "src/components/service-schema-categories-list";

const ServiceSchemaCategoriesPage: React.FC = () => {
  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
        ]}
        current="Service schema categories"
      />

      <ServiceSchemaCategoryList />
    </>
  );
};

export default ServiceSchemaCategoriesPage;
