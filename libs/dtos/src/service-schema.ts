import { DefaultBookingFieldType } from "./booking";
import { PricingStrategyType } from "./pricing";
import { ServiceSchemaCategoryDto } from "./service-schema-category";

export type ServiceSchemaFieldType = 'string' | 'multiline-text' | 'time' | 'timeframe';

export interface ServiceSchemaFieldDto {
  key: string;
  type: ServiceSchemaFieldType;
  label: string;
}

export type ServiceSchemaContentSectionType = 'text' | 'bullets';

export interface ServiceSchemaContentSectionDto {
  key: string;
  type: ServiceSchemaContentSectionType;
  title: string;
}

export type AdditionalBookingFieldType = 'string';

export interface AdditionalBookingField {
  key: string;
  type: AdditionalBookingFieldType;
  title: string;
}

export interface ServiceSchemaDto {
  _id: string;
  name: string;
  schemaCategory: ServiceSchemaCategoryDto | null;
  defaultBookingFields: DefaultBookingFieldType[];
  additionalBookingFields: AdditionalBookingField[];
  pricingStrategy: PricingStrategyType;
  shouldPayNow: boolean;
  fields: ServiceSchemaFieldDto[];
  contentSections: ServiceSchemaContentSectionDto[];
}

export type ServiceSchemaNoId = Omit<ServiceSchemaDto, '_id'>;

export type ServiceFieldValue = string | string[];

export const getDefaultValueForServiceSchemaFieldType = (schemaFieldType: ServiceSchemaFieldType): ServiceFieldValue => {
  switch (schemaFieldType) {
    case 'string': return '';
    case 'multiline-text': return '';
    case 'time': return '09:00';
    case 'timeframe': return '1 Hours';
  }
}

export const getDefaultValuesForServiceSchema = (serviceSchema: ServiceSchemaDto): Record<string, ServiceFieldValue> => {
  return serviceSchema.fields.reduce<Record<string, ServiceFieldValue>>(
    (acc, cur) => ({
      ...acc,
      [cur.key]: getDefaultValueForServiceSchemaFieldType(cur.type)
    }),
    {}
  )
}

export interface ParsedTimeframe {
  allDay: boolean;
  number: string;
  timestep: string;
}

export const parseTimeFrame = (
  str: string = ""
): ParsedTimeframe => {
  let number = "1";
  let timestep = "Hours";

  const allDay = str.trim() === "All day";

  if (!allDay) {
    [number, timestep] = str.trim().split(" ");
  }

  return { allDay, number, timestep };
}
