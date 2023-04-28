import { NextPage } from "next";
import * as React from "react";

import { OperatorCreate } from "components/operator/dashboard/operator/operator-create";

const CreateOperatorPage: NextPage = () => {
  return <OperatorCreate />;
};

CreateOperatorPage.getInitialProps = () => ({});

export default CreateOperatorPage;
