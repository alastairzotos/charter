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
        label="Set minimum number of days before booking is possible"
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

      {values.hasCutoffDays && (
        <TextField
          type="number"
          label="Cutoff days"
          size="small"
          value={values.cutoffDays || 0}
          onChange={(e) =>
            setValues({ ...values, cutoffDays: parseInt(e.target.value, 10) })
          }
        />
      )}
    </Box>
  );
};
