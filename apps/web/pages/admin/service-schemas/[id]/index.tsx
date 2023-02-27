import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { ServiceSchemaEdit } from "src/components/service-schema-edit";

const ServiceSchemaEditPage: React.FC = () => {
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

export default ServiceSchemaEditPage;
