import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { OperatorDashboardPage } from "src/components/operator-dashboard-page";
import { OwnerOperatorDashboardProvider } from "src/components/operator-dashboard-providers";
import { ServiceEdit } from "src/components/service-edit";

const EditServicePage: NextPage = () => {
  const router = useRouter();
  const serviceId = router.query.serviceId as string;

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
              current="Edit service"
            />

            <ServiceEdit id={serviceId} operatorId={operator._id} />
          </>
        )}
      </OperatorDashboardPage>
    </OwnerOperatorDashboardProvider>
  );
};

EditServicePage.getInitialProps = () => ({});

export default EditServicePage;
