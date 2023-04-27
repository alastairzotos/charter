import { PricingStrategyType } from "dtos";
import React from "react";

import { FixedPriceForm } from "components/operator/dashboard/services/price-forms/fixed";
import { PerAdultAndChildPriceForm } from "components/operator/dashboard/services/price-forms/per-adult-and-child";
import { PerAgeCohortPriceForm } from "components/operator/dashboard/services/price-forms/per-age-cohort";
import { PerPersonPriceForm } from "components/operator/dashboard/services/price-forms/per-person";
import { PriceFormProps } from "components/operator/dashboard/services/price-forms/props";
import { TieredPriceForm } from "components/operator/dashboard/services/price-forms/tiered";

interface Props extends PriceFormProps {
  pricingStrategyType: PricingStrategyType;
}

export const PriceForm: React.FC<Props> = ({
  pricingStrategyType,
  ...props
}) => {
  switch (pricingStrategyType) {
    case "onPremises":
      return null;
    case "fixed":
      return <FixedPriceForm {...props} />;
    case "perPerson":
      return <PerPersonPriceForm {...props} />;
    case "perAdultAndChild":
      return <PerAdultAndChildPriceForm {...props} />;
    case "perAgeCohort":
      return <PerAgeCohortPriceForm {...props} />;
    case "tiered":
      return <TieredPriceForm {...props} />;
  }
};
