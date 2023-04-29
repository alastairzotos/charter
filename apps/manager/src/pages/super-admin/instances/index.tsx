import { NextPage } from "next";
import * as React from "react";

import { InstancesList } from "components/super-admin/instances/instances-list";

const InstancesPage: NextPage = () => {
  return <InstancesList />;
};

InstancesPage.getInitialProps = () => ({});

export default InstancesPage;
