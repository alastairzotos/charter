import { NextPage } from "next";
import * as React from "react";

import { OperatorDashboardPage } from "components/operator/dashboard/operator/operator-dashboard-page";
import { OwnerOperatorDashboardProvider } from "components/operator/dashboard/operator/operator-dashboard-providers";
import { OperatorItem } from "components/operator/dashboard/operator/operator-item";

const OperatorPage: NextPage = () => {
  return (
    <OwnerOperatorDashboardProvider>
      <OperatorDashboardPage>
        {(operator) => <OperatorItem id={operator._id} />}
      </OperatorDashboardPage>
    </OwnerOperatorDashboardProvider>
  );
};

OperatorPage.getInitialProps = () => ({});

export default OperatorPage;
