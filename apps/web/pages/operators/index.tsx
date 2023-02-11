import { OperatorDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { getOperators } from "src/clients/operators.client";
import { SeoHead } from "src/components/seo/head";
import { Titled } from "src/components/titled";
import { UserLayoutContainer } from "src/components/user-layout/container";
import { UserOperatorsList } from "src/components/user-operators-list";

interface Props {
  operators: OperatorDto[];
}

const OperatorsPage: NextPage<Props> = ({ operators }) => {
  return (
    <UserLayoutContainer>
      <SeoHead
        subtitle="Operators"
        description="View list of available operators"
      />

      <Titled title="Operators" center>
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
