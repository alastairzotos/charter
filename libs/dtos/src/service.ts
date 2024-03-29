import { InstanceDto } from "./instance";
import { OpeningTimesDto } from "./opening-times";
import { OperatorDto } from "./operator";
import { ServicePricingDto } from "./pricing";
import { ServiceFieldValue, ServiceSchemaDto } from "./service-schema";

export interface ServiceDto {
  _id: string;
  operator: OperatorDto;
  serviceSchema: ServiceSchemaDto;
  name: string;
  slug: string;
  description: string;
  content: Record<string, string | string[]>;
  price: ServicePricingDto;
  maxPeople: number | null;
  minPeople: number | null;
  photos: string[];
  data: Record<string, ServiceFieldValue>;
  numberOfBookings: number;
  hidden: boolean;
  approveBookingBeforePayment: boolean;
  openingTimes: OpeningTimesDto;
  hasCutoffDays?: boolean;
  cutoffDays?: number;
  instance?: InstanceDto;
}

export type ServiceNoId = Omit<ServiceDto, "_id">;
