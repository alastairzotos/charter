import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { AdminRoute } from "src/components/admin-route";
import { Breadcrumbs } from "src/components/breadcrumbs";
import { TripEdit } from "src/components/trip-edit";

const EditTripPage: React.FC = () => {
  const router = useRouter();
  const operatorId = router.query.id as string;
  const tripId = router.query.tripId as string;

  return (
    <AdminRoute>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          { href: urls.admin.operators(), title: "Operators" },
          { href: urls.admin.operator(operatorId), title: "Operator" },
        ]}
        current="Edit trip"
      />

      <TripEdit id={tripId} operatorId={operatorId} />
    </AdminRoute>
  );
};

export default EditTripPage;
