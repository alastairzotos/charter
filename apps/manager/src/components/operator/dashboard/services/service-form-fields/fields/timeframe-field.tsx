import {
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Box } from "@mui/system";
import { parseTimeFrame } from "dtos";
import React, { useEffect, useState } from "react";

import { ServiceFieldProps } from "components/operator/dashboard/services/service-form-fields/fields/props";

export const TimeframeField: React.FC<ServiceFieldProps> = ({
  field: { key, label },
  values,
  setValues,
}) => {
  const {
    allDay: initialIsAllDay,
    number: initialNumber,
    timestep: initialTimestep,
  } = parseTimeFrame(values.data[key] as string);

  const [number, setNumber] = useState(initialNumber);
  const [timestep, setTimestep] = useState(initialTimestep);
  const [isAllDay, setIsAllDay] = useState(initialIsAllDay);

  useEffect(() => {
    setValues({
      ...(values as any),
      data: {
        ...values.data,
        [key]: isAllDay ? "All day" : `${number} ${timestep}`,
      },
    });
  }, [number, timestep, isAllDay]);

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
        <MenuItem value="Minutes">
          {number === "1" ? "Minute" : "Minutes"}
        </MenuItem>
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
