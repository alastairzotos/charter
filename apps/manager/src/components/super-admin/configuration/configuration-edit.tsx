import React from "react";

import { ManageConfigurationForm } from "components/super-admin/configuration/configuration-manage";
import { useConfiguration } from "contexts/configuration";
import { useUpdateConfiguration } from "state/configuration";

export const ConfigurationEdit: React.FC = () => {
  const configuration = useConfiguration();
  const [setConfigurationStatus, setConfiguration] = useUpdateConfiguration(
    (s) => [s.status, s.request]
  );

  return (
    <ManageConfigurationForm
      title="Edit configuration"
      initialValues={configuration!}
      onSave={(newConfiguration) => setConfiguration(newConfiguration)}
      saveStatus={setConfigurationStatus}
    />
  );
};
