import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { ServicesByVariant } from "components/admin/service-types/services-by-variant";
import { AdminOperatorDashboardProvider } from "components/operator/dashboard/operator/operator-dashboard-providers";

const ServiceTypePage: NextPage = () => {
  const router = useRouter();
  const schemaId = router.query.scId as string;

  return (
    <AdminOperatorDashboardProvider>
      <ServicesByVariant schemaId={schemaId} />
    </AdminOperatorDashboardProvider>
  );
};

ServiceTypePage.getInitialProps = () => ({});

export default ServiceTypePage;
