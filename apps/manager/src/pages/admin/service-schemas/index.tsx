import { NextPage } from "next";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/_core/breadcrumbs";
import { ServiceSchemaList } from "screens/admin/schemas/service-schema-list";

const ServiceSchemasPage: NextPage = () => {
  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
        ]}
        current="Service schemas"
      />

      <ServiceSchemaList />
    </>
  );
};

ServiceSchemasPage.getInitialProps = () => ({});

export default ServiceSchemasPage;
