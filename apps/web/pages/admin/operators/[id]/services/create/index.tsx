import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { ServiceCreate } from "src/components/service-create";

const CreateServicePage: React.FC = () => {
  const router = useRouter();
  const operatorId = router.query.id as string;
  const schemaId = router.query.schemaId as string;

  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
          { href: urls.admin.operators(), title: "Operators" },
          { href: urls.admin.operator(operatorId), title: "Operator" },
        ]}
        current="Create service"
      />

      <ServiceCreate operatorId={operatorId} serviceSchemaId={schemaId} />
    </>
  );
};

export default CreateServicePage;
