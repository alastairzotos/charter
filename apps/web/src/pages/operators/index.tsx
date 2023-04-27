import { OperatorDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { getOperators } from "clients/operators.client";
import { SeoHead } from "components/screens/site/lib/seo-head";
import { Titled } from "components/lib/titled";
import { UserLayoutContainer } from "components/screens/site/lib/user-layout-container";
import { UserOperatorsList } from "components/screens/site/screens/operators/screens/operarors";

interface Props {
  operators: OperatorDto[];
}

const OperatorsPage: NextPage<Props> = ({ operators }) => {
  return (
    <UserLayoutContainer>
      <SeoHead
        subtitle="Browse pperators"
        description="View list of available operators"
      />

      <Titled title="Browse operators" center>
        <UserOperatorsList operators={operators} />
      </Titled>
    </UserLayoutContainer>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      operators: await getOperators(),
    },
  };
};

export default OperatorsPage;
