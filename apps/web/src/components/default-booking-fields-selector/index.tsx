import InfoIcon from "@mui/icons-material/Info";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { DefaultBookingFieldType, PricingStrategyType } from "dtos";
import React from "react";
import { pricingStrategyProvidesNumberOfPeople } from "utils";

interface Props {
  pricingStrategy: PricingStrategyType;
  defaultBookingFields: DefaultBookingFieldType[];
  onChange: (fields: DefaultBookingFieldType[]) => void;
}

const fields: Array<{ type: DefaultBookingFieldType; label: string }> = [
  { type: "date", label: "Date" },
  { type: "time", label: "Time" },
  { type: "numberOfPeople", label: "Number of people" },
];

export const DefaultBookingFieldsSelector: React.FC<Props> = ({
  pricingStrategy,
  defaultBookingFields,
  onChange,
}) => {
  return (
    <Paper sx={{ p: 3 }}>
      <FormLabel>Required booking fields</FormLabel>

      <FormGroup sx={{ width: "100%" }}>
        {fields.map(({ type, label }) => (
          <Box sx={{ display: "flex" }}>
            <FormControlLabel
              key={type}
              label={label}
              control={
                <Checkbox
                  disabled={
                    type === "numberOfPeople" &&
                    pricingStrategyProvidesNumberOfPeople(pricingStrategy)
                  }
                  checked={defaultBookingFields.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange([...defaultBookingFields, type]);
                    } else {
                      onChange(
                        defaultBookingFields.filter((field) => field !== type)
                      );
                    }
                  }}
                />
              }
            />

            {type === "numberOfPeople" &&
              pricingStrategyProvidesNumberOfPeople(pricingStrategy) && (
                <Tooltip
                  arrow
                  title="We can determine the number of people from the pricing strategy"
                >
                  <InfoIcon sx={{ color: "gray", mt: 1 }} />
                </Tooltip>
              )}
          </Box>
        ))}
      </FormGroup>
    </Paper>
  );
};
