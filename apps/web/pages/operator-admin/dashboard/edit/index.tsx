import { NextPage } from "next";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { OperatorDashboardPage } from "src/components/operator-dashboard-page";
import { OwnerOperatorDashboardProvider } from "src/components/operator-dashboard-providers";
import { OperatorEdit } from "src/components/operator-edit";

const OperatorPage: NextPage = () => {
  return (
    <OwnerOperatorDashboardProvider>
      <OperatorDashboardPage>
        {(operator) => (
          <>
            <Breadcrumbs
              list={[
                { href: urls.home(), title: "Home" },
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
