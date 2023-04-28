import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { AdminOperatorDashboardProvider } from "components/operator/dashboard/operator/operator-dashboard-providers";
import { OperatorItem } from "components/operator/dashboard/operator/operator-item";

const OperatorPage: NextPage = () => {
  const router = useRouter();
  const operatorId = router.query.operatorId as string;

  return (
    <AdminOperatorDashboardProvider>
      <OperatorItem id={operatorId} />
    </AdminOperatorDashboardProvider>
  );
};

OperatorPage.getInitialProps = () => ({});

export default OperatorPage;
