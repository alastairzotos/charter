import { NextPage } from "next";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/screens/backend/lib/breadcrumbs";
import { ServiceSchemaList } from "components/screens/backend/screens/admin/screens/schemas/screens/service-schema-list";

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
