import { NextPage } from "next";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/_core/breadcrumbs";
import { ServiceSchemaCategoryCreate } from "components/admin/schema-categories/service-schema-category-create";

const ServiceSchemaCategoryCreatePage: NextPage = () => {
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

ServiceSchemaCategoryCreatePage.getInitialProps = () => ({});

export default ServiceSchemaCategoryCreatePage;
