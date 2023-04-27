import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/screens/backend/lib/breadcrumbs";
import { AdminOperatorDashboardProvider } from "components/screens/backend/screens/operator/screens/dashboard/screens/operator/lib/operator-dashboard-providers";
import { OperatorEdit } from "components/screens/backend/screens/operator/screens/dashboard/screens/operator/screens/operator-edit";

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
          { href: urls.admin.operator(id), title: "Operator" },
        ]}
        current="Edit operator"
      />

      <OperatorEdit id={id} />
    </AdminOperatorDashboardProvider>
  );
};

OperatorPage.getInitialProps = () => ({});

export default OperatorPage;
