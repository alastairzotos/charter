import { TextField, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import { ServiceFieldProps } from "src/components/service-form-fields/fields/props";

export const TimeframeField: React.FC<ServiceFieldProps> = ({
  field: { field, label },
  values,
  setValues,
}) => {
  const value = values.data[field] as string;
  const [initialNumber, initialTimestep] = value.trim().split(" ");

  const [number, setNumber] = useState(initialNumber);
  const [timestep, setTimestep] = useState(initialTimestep);

  useEffect(() => {
    setValues({
      ...(values as any),
      data: {
        ...values.data,
        [field]: `${number} ${timestep}`,
      },
    });
  }, [number, timestep]);

  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <TextField
        label={label}
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        sx={{ flexGrow: 1 }}
        InputProps={{
          inputProps: { min: 1 },
        }}
      />
      <Select value={timestep} onChange={(e) => setTimestep(e.target.value)}>
        <MenuItem value="Hours">{number === "1" ? "Hour" : "Hours"}</MenuItem>
        <MenuItem value="Days">{number === "1" ? "Day" : "Days"}</MenuItem>
      </Select>
    </Box>
  );
};
