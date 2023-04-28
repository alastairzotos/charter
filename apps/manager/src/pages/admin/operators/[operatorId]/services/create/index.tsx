import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { AdminOperatorDashboardProvider } from "components/operator/dashboard/operator/operator-dashboard-providers";
import { ServiceCreate } from "components/operator/dashboard/services/service-create";

const CreateServicePage: NextPage = () => {
  const router = useRouter();
  const operatorId = router.query.operatorId as string;
  const schemaId = router.query.schemaId as string;

  return (
    <AdminOperatorDashboardProvider>
      <ServiceCreate operatorId={operatorId} serviceSchemaId={schemaId} />
    </AdminOperatorDashboardProvider>
  );
};

CreateServicePage.getInitialProps = () => ({});

export default CreateServicePage;
