import { OperatorDto } from "dtos";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { getOperators } from "clients/operators.client";
import { SeoHead } from "components/seo/head";
import { Titled } from "components/titled";
import { UserLayoutContainer } from "components/user-layout/container";
import { UserOperatorsList } from "components/user-operators-list";

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
