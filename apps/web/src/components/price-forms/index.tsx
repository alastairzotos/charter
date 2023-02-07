import { PricingStrategyType } from "dtos";
import React from "react";

import { FixedPriceForm } from "src/components/price-forms/fixed";
import { PerAdultAndChildPriceForm } from "src/components/price-forms/per-adult-and-child";
import { PerPersonPriceForm } from "src/components/price-forms/per-person";
import { PriceFormProps } from "src/components/price-forms/props";
import { TieredPriceForm } from "src/components/price-forms/tiered";

interface Props extends PriceFormProps {
  pricingStrategyType: PricingStrategyType;
}

export const PriceForm: React.FC<Props> = ({
  pricingStrategyType,
  ...props
}) => {
  switch (pricingStrategyType) {
    case "fixed":
      return <FixedPriceForm {...props} />;
    case "perPerson":
      return <PerPersonPriceForm {...props} />;
    case "perAdultAndChild":
      return <PerAdultAndChildPriceForm {...props} />;
    case "tiered":
      return <TieredPriceForm {...props} />;
  }
};
