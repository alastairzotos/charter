import { NextPage } from "next";
import * as React from "react";

import { InstanceCreate } from "components/super-admin/instances/instance-create";

const InstanceCreatePage: NextPage = () => {
  return <InstanceCreate />;
};

InstanceCreatePage.getInitialProps = () => ({});

export default InstanceCreatePage;
