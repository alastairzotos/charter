import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/lib/backend/_core/breadcrumbs";
import { AdminOperatorDashboardProvider } from "components/lib/backend/operator/dashboard/operator/operator-dashboard-providers";
import { OperatorItem } from "components/lib/backend/operator/dashboard/operator/operator-item";

const OperatorPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <AdminOperatorDashboardProvider>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          { href: urls.admin.operators(), title: "Operators" },
        ]}
        current="Operator"
      />

      <OperatorItem id={id} />
    </AdminOperatorDashboardProvider>
  );
};

OperatorPage.getInitialProps = () => ({});

export default OperatorPage;
