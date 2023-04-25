import { NextPage } from "next";
import * as React from "react";
import { urls } from "urls";

import { Breadcrumbs } from "components/breadcrumbs";
import { useRouter } from "next/router";
import { OperatorSearch } from "components/operator-search";

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
