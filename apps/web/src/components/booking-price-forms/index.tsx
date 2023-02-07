import { PricingStrategyType } from "dtos";
import React from "react";

import { PerAdultAndChildPriceDetails } from "src/components/booking-price-forms/per-adult-and-child";
import { PerPersonPriceDetails } from "src/components/booking-price-forms/per-person";
import { BookingPriceProps } from "src/components/booking-price-forms/props";
import { TieredPriceDetails } from "src/components/booking-price-forms/tiered";

interface Props extends BookingPriceProps {
  pricingStrategy: PricingStrategyType;
}

export const BookingPriceDetails: React.FC<Props> = ({
  pricingStrategy,
  ...props
}) => {
  switch (pricingStrategy) {
    case "fixed":
      return null;
    case "perPerson":
      return <PerPersonPriceDetails {...props} />;
    case "perAdultAndChild":
      return <PerAdultAndChildPriceDetails {...props} />;
    case "tiered":
      return <TieredPriceDetails {...props} />;
  }
};
