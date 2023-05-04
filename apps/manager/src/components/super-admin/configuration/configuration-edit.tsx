import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";

import { ManageConfigurationForm } from "components/super-admin/configuration/configuration-manage";
import {
  useGetConfiguration,
  useUpdateConfiguration,
} from "state/configuration";

export const ConfigurationEdit: React.FC = () => {
  const [getConfigurationStatus, getConfiguration, configuration] =
    useGetConfiguration((s) => [s.status, s.request, s.value]);
  const [setConfigurationStatus, setConfiguration] = useUpdateConfiguration(
    (s) => [s.status, s.request]
  );

  useEffect(() => {
    getConfiguration();
  }, []);

  return (
    <StatusSwitch
      status={getConfigurationStatus}
      error={
        <Typography>
          There was an error getting the current configuration
        </Typography>
      }
    >
      <ManageConfigurationForm
        title="Edit configuration"
        initialValues={configuration!}
        onSave={(newConfiguration) => setConfiguration(newConfiguration)}
        saveStatus={setConfigurationStatus}
      />
    </StatusSwitch>
  );
};
