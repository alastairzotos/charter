import { ServicePricingDto } from "dtos";

export interface PriceFormProps {
  pricing: ServicePricingDto;
  setPricing: (pricing: ServicePricingDto) => void;
}
