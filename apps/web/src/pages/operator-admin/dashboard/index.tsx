import { NextPage } from "next";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/screens/backend/lib/breadcrumbs";
import { OperatorDashboardPage } from "components/screens/backend/screens/operator/screens/dashboard/screens/operator/lib/operator-dashboard-page";
import { OwnerOperatorDashboardProvider } from "components/screens/backend/screens/operator/screens/dashboard/screens/operator/lib/operator-dashboard-providers";
import { OperatorItem } from "components/screens/backend/screens/operator/screens/dashboard/screens/operator/lib/operator-item";

const OperatorPage: NextPage = () => {
  return (
    <OwnerOperatorDashboardProvider>
      <OperatorDashboardPage>
        {(operator) => (
          <>
            <Breadcrumbs
              list={[
                { href: urls.home(), title: "Home" },
                { href: urls.operators.home(), title: "Operator" },
              ]}
              current="Dashboard"
            />

            <OperatorItem id={operator._id} />
          </>
        )}
      </OperatorDashboardPage>
    </OwnerOperatorDashboardProvider>
  );
};

OperatorPage.getInitialProps = () => ({});

export default OperatorPage;
