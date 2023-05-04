import { NextPage } from "next";

import { ConfigurationEdit } from "components/super-admin/configuration/configuration-edit";

const ConfigurationPage: NextPage = () => {
  return <ConfigurationEdit />;
};

ConfigurationPage.getInitialProps = () => ({});

export default ConfigurationPage;
