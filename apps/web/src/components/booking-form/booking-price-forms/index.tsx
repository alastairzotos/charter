import { PricingStrategyType } from "dtos";
import React from "react";

import { PerAdultAndChildPriceDetails } from "components/booking-form/booking-price-forms/per-adult-and-child";
import { PerAgeCohortPriceDetails } from "components/booking-form/booking-price-forms/per-age-cohort";
import { PerPersonPriceDetails } from "components/booking-form/booking-price-forms/per-person";
import { BookingPriceProps } from "components/booking-form/booking-price-forms/props";
import { TieredPriceDetails } from "components/booking-form/booking-price-forms/tiered";

interface Props extends BookingPriceProps {
  pricingStrategy: PricingStrategyType;
}

export const BookingPriceDetails: React.FC<Props> = ({
  pricingStrategy,
  ...props
}) => {
  switch (pricingStrategy) {
    case "onPremises":
      return null;
    case "fixed":
      return null;
    case "perPerson":
      return <PerPersonPriceDetails {...props} />;
    case "perAdultAndChild":
      return <PerAdultAndChildPriceDetails {...props} />;
    case "perAgeCohort":
      return <PerAgeCohortPriceDetails {...props} />;
    case "tiered":
      return <TieredPriceDetails {...props} />;
  }
};
