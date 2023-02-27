import { OperatorDto } from "./operator";
import { ServicePricingDto } from "./pricing";
import { ServiceFieldValue, ServiceSchemaDto } from "./service-schema";

export interface ServiceDto {
  _id: string;
  operator: OperatorDto;
  serviceSchema: ServiceSchemaDto;
  name: string;
  description: string;
  price: ServicePricingDto;
  maxPeople: number | null;
  minPeople: number | null;
  photos: string[];
  data: Record<string, ServiceFieldValue>;
  numberOfBookings: number;
}

export type ServiceNoId = Omit<ServiceDto, '_id'>;