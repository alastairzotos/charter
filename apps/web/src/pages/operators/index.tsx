import { OperatorDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { getOperators } from "clients/operators.client";
import { Titled } from "components/lib/_core/titled";
import { SeoHead } from "components/lib/site/_core/seo-head";
import { UserLayoutContainer } from "components/lib/site/_core/user-layout-container";
import { UserOperatorsList } from "components/screens/site/operators/operarors";

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
