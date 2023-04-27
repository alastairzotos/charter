import { BookingPriceDetails, ServicePricingDto } from "dtos";

export interface BookingPriceProps {
  pricing: ServicePricingDto;
  priceDetails: BookingPriceDetails;
  setPriceDetails: (priceDetails: BookingPriceDetails) => void;
}
