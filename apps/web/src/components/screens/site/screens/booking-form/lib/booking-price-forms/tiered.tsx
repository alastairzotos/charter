import { MenuItem } from "@mui/material";
import { Field } from "formik";
import { Select } from "formik-mui";
import React from "react";
import { createPriceString } from "utils";

import { BookingPriceProps } from "components/user/booking/booking-price-forms/props";

export const TieredPriceDetails: React.FC<BookingPriceProps> = ({
  pricing,
}) => {
  const tiers = pricing.tiered?.tiers || [];

  return (
    <Field
      component={Select}
      name="priceDetails.tiered.tier"
      label="Select option"
    >
      {tiers.map(({ name, rate }, index) => (
        <MenuItem key={name + index} value={name}>
          {name}: {createPriceString(rate)}
        </MenuItem>
      ))}
    </Field>
  );
};
