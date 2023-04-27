import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/lib/backend/_core/breadcrumbs";
import { OperatorSearch } from "components/lib/backend/admin/operators/operator-search";

const OperatorsPage: NextPage = () => {
  const router = useRouter();

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
        onSelectOperator={(operator) =>
          router.push(urls.admin.operator(operator._id))
        }
      />
    </>
  );
};

OperatorsPage.getInitialProps = () => ({});

export default OperatorsPage;
