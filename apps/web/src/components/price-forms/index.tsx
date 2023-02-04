import { PricingStrategyType } from "dtos";
import React from "react";

import { FixedPriceForm } from "src/components/price-forms/fixed";
import { PerAdultAndChildPriceForm } from "src/components/price-forms/per-adult-and-child";
import { PerPersonPriceForm } from "src/components/price-forms/per-person";

interface Props {
  pricingStrategyType: PricingStrategyType;
}

export const PriceForm: React.FC<Props> = ({ pricingStrategyType }) => {
  switch (pricingStrategyType) {
    case "fixed":
      return <FixedPriceForm />;
    case "perPerson":
      return <PerPersonPriceForm />;
    case "perAdultAndChild":
      return <PerAdultAndChildPriceForm />;
  }
};
