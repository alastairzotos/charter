import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { AdminOperatorDashboardProvider } from "components/operator/dashboard/operator/operator-dashboard-providers";
import { ServiceEdit } from "components/operator/dashboard/services/service-edit";

const EditServicePage: NextPage = () => {
  const router = useRouter();
  const operatorId = router.query.operatorId as string;
  const serviceId = router.query.serviceId as string;

  return (
    <AdminOperatorDashboardProvider>
      <ServiceEdit id={serviceId} operatorId={operatorId} />
    </AdminOperatorDashboardProvider>
  );
};

EditServicePage.getInitialProps = () => ({});

export default EditServicePage;
