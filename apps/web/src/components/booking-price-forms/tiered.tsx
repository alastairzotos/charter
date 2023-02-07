import { MenuItem } from "@mui/material";
import { Field } from "formik";
import { Select } from "formik-mui";
import React from "react";
import { createPriceString } from "utils";

import { BookingPriceProps } from "src/components/booking-price-forms/props";

export const TieredPriceDetails: React.FC<BookingPriceProps> = ({
  pricing,
}) => {
  const tiers = pricing.tiered?.tiers || {};

  return (
    <Field
      component={Select}
      name="priceDetails.tiered.tier"
      label="Select option"
    >
      {Object.keys(tiers).map((tierName, index) => (
        <MenuItem key={tierName + index} value={tierName}>
          {tierName}: {createPriceString(tiers[tierName] || 0)}
        </MenuItem>
      ))}
    </Field>
  );
};
