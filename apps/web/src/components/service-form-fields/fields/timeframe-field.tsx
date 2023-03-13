import {
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import { ServiceFieldProps } from "src/components/service-form-fields/fields/props";

export const TimeframeField: React.FC<ServiceFieldProps> = ({
  field: { key, label },
  values,
  setValues,
}) => {
  const value = (values.data[key] as string) || "";
  let initialNumber = "1";
  let initialTimestep = "Hours";

  const initialIsAllDay = value.trim() === "All day";

  if (!initialIsAllDay) {
    [initialNumber, initialTimestep] = value.trim().split(" ");
  }

  const [number, setNumber] = useState(initialNumber);
  const [timestep, setTimestep] = useState(initialTimestep);
  const [isAllDay, setIsAllDay] = useState(initialIsAllDay);

  useEffect(() => {
    setValues({
      ...(values as any),
      data: {
        ...values.data,
        [key]: `${number} ${timestep}`,
      },
    });
  }, [number, timestep]);

  const handleAllDayCheckboxClick = (checked: boolean) => {
    setIsAllDay(checked);
    setValues({
      ...(values as any),
      data: {
        ...values.data,
        [key]: "All day",
      },
    });

    if (!checked) {
      setNumber("1");
      setTimestep("Hours");
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <TextField
        label={label}
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        disabled={isAllDay}
        sx={{ flexGrow: 1 }}
        InputProps={{
          inputProps: { min: 1 },
          style: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
      />
      <Select
        value={timestep}
        onChange={(e) => setTimestep(e.target.value)}
        disabled={isAllDay}
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          marginLeft: "-1px",
        }}
      >
        <MenuItem value="Hours">{number === "1" ? "Hour" : "Hours"}</MenuItem>
        <MenuItem value="Days">{number === "1" ? "Day" : "Days"}</MenuItem>
      </Select>

      <FormControlLabel
        sx={{ ml: 1 }}
        label="All day"
        control={
          <Checkbox
            checked={isAllDay}
            onChange={(e) => handleAllDayCheckboxClick(e.target.checked)}
          />
        }
      />
    </Box>
  );
};
