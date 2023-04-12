import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { AdminOperatorDashboardProvider } from "src/components/operator-dashboard-providers";
import { ServiceCreate } from "src/components/service-create";

const CreateServicePage: NextPage = () => {
  const router = useRouter();
  const operatorId = router.query.id as string;
  const schemaId = router.query.schemaId as string;

  return (
    <AdminOperatorDashboardProvider>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          { href: urls.admin.operators(), title: "Operators" },
          { href: urls.admin.operator(operatorId), title: "Operator" },
        ]}
        current="Create service"
      />

      <ServiceCreate operatorId={operatorId} serviceSchemaId={schemaId} />
    </AdminOperatorDashboardProvider>
  );
};

CreateServicePage.getInitialProps = () => ({});

export default CreateServicePage;
