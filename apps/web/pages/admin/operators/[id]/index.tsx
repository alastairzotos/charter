import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { AdminRoute } from "src/components/admin-route";
import { Breadcrumbs } from "src/components/breadcrumbs";
import { OperatorItem } from "src/components/operator-item";

const OperatorPage: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <AdminRoute>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          { href: urls.admin.operators(), title: "Operators" },
        ]}
        current="Operator"
      />

      <OperatorItem id={id} />
    </AdminRoute>
  );
};

export default OperatorPage;
