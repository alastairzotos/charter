import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { OperatorDto } from "dtos";
import React, { useEffect } from "react";

import { StatusSwitch } from "components/status-switch";
import { useLoadOperators } from "state/operators";

interface Props {
  onSelectOperator: (operator: OperatorDto) => void;
}

export const OperatorSearch: React.FC<Props> = ({ onSelectOperator }) => {
  const { status, request, value: operators } = useLoadOperators();

  useEffect(() => {
    request();
  }, []);

  return (
    <StatusSwitch
      status={status}
      error={<Typography>There was an error loading the operators</Typography>}
    >
      <Autocomplete
        freeSolo
        options={operators || []}
        getOptionLabel={(option) => (option as OperatorDto).name}
        onChange={(_, v) => onSelectOperator(v as OperatorDto)}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={option.photo}
              alt={option.name}
            />
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search operators"
            sx={{ backgroundColor: "white" }}
          />
        )}
      />
    </StatusSwitch>
  );
};
