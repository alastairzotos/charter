import { OperatorDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Titled } from "ui";

import { getOperators } from "clients/operators.client";
import { SeoHead } from "components/_core/seo-head";
import { UserLayoutContainer } from "components/_core/user-layout-container";
import { UserOperatorsList } from "components/operators/operarors";

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
