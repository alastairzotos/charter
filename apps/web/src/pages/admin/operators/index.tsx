import { NextPage } from "next";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/breadcrumbs";
import { OperatorsList } from "components/operators-list";

const OperatorsPage: NextPage = () => {
  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
        ]}
        current="Operators"
      />

      <OperatorsList />
    </>
  );
};

OperatorsPage.getInitialProps = () => ({});

export default OperatorsPage;