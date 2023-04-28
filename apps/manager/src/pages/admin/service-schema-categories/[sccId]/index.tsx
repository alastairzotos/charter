import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { ServiceSchemaCategoryEdit } from "components/admin/schema-categories/service-schema-category-edit";

const ServiceSchemaCategoryEditPage: NextPage = () => {
  const router = useRouter();
  const sccId = router.query.sccId as string;

  return <ServiceSchemaCategoryEdit id={sccId} />;
};

ServiceSchemaCategoryEditPage.getInitialProps = () => ({});

export default ServiceSchemaCategoryEditPage;
