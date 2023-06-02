import { ServicePricingDto } from "dtos";

export interface PriceFormProps {
  pricing: ServicePricingDto;
  setPricing: (pricing: ServicePricingDto) => void;
}

export const pricingInputProps = {
  inputProps: {
    min: 0,
    step: "any",
  },
};
