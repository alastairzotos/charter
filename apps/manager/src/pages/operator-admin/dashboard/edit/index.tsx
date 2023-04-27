import { NextPage } from "next";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/_core/breadcrumbs";
import { OperatorDashboardPage } from "components/operator/dashboard/operator/operator-dashboard-page";
import { OwnerOperatorDashboardProvider } from "components/operator/dashboard/operator/operator-dashboard-providers";
import { OperatorEdit } from "components/operator/dashboard/operator/operator-edit";

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
                { href: urls.operators.dashboard(), title: "Dashboard" },
              ]}
              current="Edit operator"
            />

            <OperatorEdit id={operator._id} />
          </>
        )}
      </OperatorDashboardPage>
    </OwnerOperatorDashboardProvider>
  );
};

OperatorPage.getInitialProps = () => ({});

export default OperatorPage;
