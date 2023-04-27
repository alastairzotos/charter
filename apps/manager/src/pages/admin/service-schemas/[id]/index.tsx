import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/_core/breadcrumbs";
import { ServiceSchemaEdit } from "screens/admin/schemas/service-schema-edit";

const ServiceSchemaEditPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          { href: urls.admin.serviceSchemas(), title: "Service schemas" },
        ]}
        current="Edit service schema"
      />

      <ServiceSchemaEdit id={id} />
    </>
  );
};

ServiceSchemaEditPage.getInitialProps = () => ({});

export default ServiceSchemaEditPage;
