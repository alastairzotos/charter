import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { OperatorDashboardPage } from "components/operator/dashboard/operator/operator-dashboard-page";
import { OwnerOperatorDashboardProvider } from "components/operator/dashboard/operator/operator-dashboard-providers";
import { ServiceEdit } from "components/operator/dashboard/services/service-edit";

const EditServicePage: NextPage = () => {
  const router = useRouter();
  const serviceId = router.query.serviceId as string;

  return (
    <OwnerOperatorDashboardProvider>
      <OperatorDashboardPage>
        {(operator) => <ServiceEdit id={serviceId} operatorId={operator._id} />}
      </OperatorDashboardPage>
    </OwnerOperatorDashboardProvider>
  );
};

EditServicePage.getInitialProps = () => ({});

export default EditServicePage;
