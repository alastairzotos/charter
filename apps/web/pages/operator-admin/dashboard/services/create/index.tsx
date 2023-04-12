import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { OperatorDashboardPage } from "src/components/operator-dashboard-page";
import { OwnerOperatorDashboardProvider } from "src/components/operator-dashboard-providers";
import { ServiceCreate } from "src/components/service-create";

const CreateServicePage: NextPage = () => {
  const router = useRouter();
  const schemaId = router.query.schemaId as string;

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
              current="Create service"
            />

            <ServiceCreate
              operatorId={operator._id}
              serviceSchemaId={schemaId}
            />
          </>
        )}
      </OperatorDashboardPage>
    </OwnerOperatorDashboardProvider>
  );
};

CreateServicePage.getInitialProps = () => ({});

export default CreateServicePage;
