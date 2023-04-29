import { FormControlLabel, Checkbox, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ServiceNoId } from "dtos";
import React from "react";

interface Props {
  values: ServiceNoId;
  setValues: (values: ServiceNoId) => void;
}

export const ServiceBookingCutoffSelector: React.FC<Props> = ({
  values,
  setValues,
}) => {
  return (
    <Box sx={{ displat: "flex" }}>
      <FormControlLabel
        label="Booking cutoff days"
        control={
          <Checkbox
            checked={values.hasCutoffDays}
            onChange={(e) => {
              setValues({
                ...values,
                hasCutoffDays: e.currentTarget.checked,
              });
            }}
          />
        }
      />

      <TextField
        type="number"
        label="Cutoff days"
        size="small"
        disabled={!values.hasCutoffDays}
        inputProps={{ min: 0 }}
        value={values.cutoffDays || 0}
        onChange={(e) =>
          setValues({ ...values, cutoffDays: parseInt(e.target.value, 10) })
        }
      />
    </Box>
  );
};
