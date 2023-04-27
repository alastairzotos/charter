import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/screens/backend/lib/breadcrumbs";
import { ServiceSchemaCategoryEdit } from "components/screens/backend/screens/admin/screens/schema-categories/screens/service-schema-category-edit";

const ServiceSchemaCategoryEditPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

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
        current="Edit service schema category"
      />

      <ServiceSchemaCategoryEdit id={id} />
    </>
  );
};

ServiceSchemaCategoryEditPage.getInitialProps = () => ({});

export default ServiceSchemaCategoryEditPage;
