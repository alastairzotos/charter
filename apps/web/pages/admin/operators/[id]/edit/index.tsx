import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "src/components/breadcrumbs";
import { OperatorEdit } from "src/components/operator-edit";

const OperatorPage: NextPage = () => {
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

OperatorPage.getInitialProps = () => ({});

export default OperatorPage;
