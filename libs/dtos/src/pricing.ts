export interface PriceDto {
  price: number;
}

export interface PerAdultAndChildPriceDto {
  adultPrice: number;
  childPrice: number;
}

export interface AgeCohortPrice {
  name: string;
  fromAge: number;
  toAge: number;
  price: number;
}

export interface PerAgeCohortPriceDto {
  ageCohorts: AgeCohortPrice[];
}

export interface PriceTierDto {
  name: string;
  rate: number;
}

export interface TieredPriceDto {
  tiers: PriceTierDto[];
}

export type ServicePricingDto = Partial<{
  onPremises: void;
  fixed: PriceDto;
  perPerson: PriceDto;
  perAdultAndChild: PerAdultAndChildPriceDto;
  perAgeCohort: PerAgeCohortPriceDto;
  tiered: TieredPriceDto;
}>

export type PricingStrategyType = keyof ServicePricingDto;
