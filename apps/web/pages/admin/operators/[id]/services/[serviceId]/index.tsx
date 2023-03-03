import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { ServiceEdit } from "src/components/service-edit";

const EditServicePage: NextPage = () => {
  const router = useRouter();
  const operatorId = router.query.id as string;
  const serviceId = router.query.serviceId as string;

  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          { href: urls.admin.operators(), title: "Operators" },
          { href: urls.admin.operator(operatorId), title: "Operator" },
        ]}
        current="Edit service"
      />

      <ServiceEdit id={serviceId} operatorId={operatorId} />
    </>
  );
};

EditServicePage.getInitialProps = () => ({});

export default EditServicePage;
