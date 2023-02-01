import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { OperatorEdit } from "src/components/operator-edit";

const OperatorPage: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
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
    </>
  );
};

export default OperatorPage;
