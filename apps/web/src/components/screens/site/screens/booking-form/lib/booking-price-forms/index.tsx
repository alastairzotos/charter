import { PerAdultAndChildPriceDetails } from "components/screens/site/screens/booking-form/lib/booking-price-forms/per-adult-and-child";
import { PerAgeCohortPriceDetails } from "components/screens/site/screens/booking-form/lib/booking-price-forms/per-age-cohort";
import { PerPersonPriceDetails } from "components/screens/site/screens/booking-form/lib/booking-price-forms/per-person";
import { BookingPriceProps } from "components/screens/site/screens/booking-form/lib/booking-price-forms/props";
import { TieredPriceDetails } from "components/screens/site/screens/booking-form/lib/booking-price-forms/tiered";
import { PricingStrategyType } from "dtos";
import React from "react";

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
