import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { ServiceSchemaEdit } from "components/admin/schemas/service-schema-edit";

const ServiceSchemaEditPage: NextPage = () => {
  const router = useRouter();
  const scId = router.query.scId as string;

  return <ServiceSchemaEdit id={scId} />;
};

ServiceSchemaEditPage.getInitialProps = () => ({});

export default ServiceSchemaEditPage;
