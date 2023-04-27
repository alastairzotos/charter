import { NextPage } from "next";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/lib/backend/_core/breadcrumbs";
import { ServiceSchemaCategoryList } from "components/screens/backend/admin/schema-categories/service-schema-categories-list";

const ServiceSchemaCategoriesPage: NextPage = () => {
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

ServiceSchemaCategoriesPage.getInitialProps = () => ({});

export default ServiceSchemaCategoriesPage;
