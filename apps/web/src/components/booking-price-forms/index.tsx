import { PricingStrategyType } from "dtos";
import React from "react";

import { PerAdultAndChildPriceDetails } from "src/components/booking-price-forms/per-adult-and-child";
import { PerPersonPriceDetails } from "src/components/booking-price-forms/per-person";

interface Props {
  pricingStrategy: PricingStrategyType;
}

export const BookingPriceDetails: React.FC<Props> = ({ pricingStrategy }) => {
  switch (pricingStrategy) {
    case "fixed":
      return null;
    case "perPerson":
      return <PerPersonPriceDetails />;
    case "perAdultAndChild":
      return <PerAdultAndChildPriceDetails />;
  }
};
