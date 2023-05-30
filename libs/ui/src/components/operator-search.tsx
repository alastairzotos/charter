import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { OperatorDto } from "dtos";
import React, { useEffect } from "react";
import { StatusSwitch } from "./status-switch";

import { QueryState } from "@bitmetro/create-query";

interface Props {
  state: QueryState<Promise<OperatorDto[]>, []>;
  onSelectOperator: (operator: OperatorDto) => void;
}

const SearchField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const OperatorSearch: React.FC<Props> = ({
  state,
  onSelectOperator,
}) => {
  const { status, request, value: operators } = state;

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
          <SearchField {...params} label="Search operators" />
        )}
      />
    </StatusSwitch>
  );
};
