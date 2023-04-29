import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { InstanceEdit } from "components/super-admin/instances/instance-edit";

const InstancePage: NextPage = () => {
  const router = useRouter();

  const id = router.query.instanceId as string;

  return <InstanceEdit id={id} />;
};

InstancePage.getInitialProps = () => ({});

export default InstancePage;
