import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { PricingStrategyType } from "dtos";
import React from "react";

interface Props {
  pricingStrategy: PricingStrategyType;
  onChange: (pricingStrategy: PricingStrategyType) => void;
}

export const PricingStrategyTypeSelector: React.FC<Props> = ({
  pricingStrategy,
  onChange,
}) => {
  return (
    <FormControl>
      <InputLabel id="pricing-strategy-label">Pricing strategy</InputLabel>
      <Select
        labelId="pricing-strategy-label"
        label="Pricing strategy"
        value={pricingStrategy}
        onChange={(e) => onChange(e.target.value as PricingStrategyType)}
      >
        <MenuItem value="onPremises">On Premises</MenuItem>
        <MenuItem value="fixed">Fixed</MenuItem>
        <MenuItem value="perPerson">Per person</MenuItem>
        <MenuItem value="perAdultAndChild">Per adult and child</MenuItem>
        <MenuItem value="tiered">Tiered</MenuItem>
      </Select>
    </FormControl>
  );
};
