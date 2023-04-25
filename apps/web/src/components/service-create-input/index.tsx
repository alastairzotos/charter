import { Box, TextField, Typography, Autocomplete } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { ServiceSchemaDto } from "dtos";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { StatusSwitch } from "components/status-switch";
import { useOperatorDashboard } from "contexts/operator-dashboard";
import { useLoadServiceSchemas } from "state/service-schemas";

interface Props {
  operatorId: string;
}

export const ServiceCreateInput: React.FC<Props> = ({ operatorId }) => {
  const router = useRouter();
  const { getServiceCreateUrl } = useOperatorDashboard();

  const [loadServiceSchemasStatus, loadServiceSchemas, serviceSchemas] =
    useLoadServiceSchemas((s) => [s.status, s.request, s.value]);

  useEffect(() => {
    loadServiceSchemas();
  }, []);

  const handleServiceSchemaClick = (schema: ServiceSchemaDto) => {
    router.push(getServiceCreateUrl(operatorId, schema._id));
  };

  return (
    <StatusSwitch
      status={loadServiceSchemasStatus}
      error={
        <Typography>There was an error loading the service schemas</Typography>
      }
    >
      <Autocomplete
        sx={{ width: 300 }}
        freeSolo
        options={serviceSchemas || []}
        getOptionLabel={(option) => (option as ServiceSchemaDto).name}
        onChange={(_, v) => handleServiceSchemaClick(v as ServiceSchemaDto)}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.schemaCategory?.photo ? (
              <img
                loading="lazy"
                width="20"
                src={option.schemaCategory?.photo}
                alt={option.name}
              />
            ) : (
              <InsertPhotoIcon sx={{ width: 20, height: 20, mr: 2 }} />
            )}
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Add new service" />
        )}
      />
    </StatusSwitch>
  );
};
