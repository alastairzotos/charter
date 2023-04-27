import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/lib/backend/_core/breadcrumbs";
import { OperatorSearch } from "ui";
import { useLoadOperators } from "state/operators";

const OperatorsPage: NextPage = () => {
  const router = useRouter();
  const state = useLoadOperators();

  return (
    <>
      <Breadcrumbs
        list={[
          { href: urls.home(), title: "Home" },
          { href: urls.admin.home(), title: "Admin" },
        ]}
        current="Operators"
      />

      <OperatorSearch
        state={state}
        onSelectOperator={(operator) =>
          router.push(urls.admin.operator(operator._id))
        }
      />
    </>
  );
};

OperatorsPage.getInitialProps = () => ({});

export default OperatorsPage;
