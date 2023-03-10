import { DefaultBookingFieldType } from "./booking";
import { PricingStrategyType } from "./pricing";
import { ServiceSchemaCategoryDto } from "./service-schema-category";

export type ServiceSchemaFieldType = 'string' | 'time' | 'timeframe';

export interface ServiceSchemaFieldDto {
  label: string;
  type: ServiceSchemaFieldType;
}

export interface ServiceSchemaDto {
  _id: string;
  name: string;
  schemaCategory: ServiceSchemaCategoryDto | null;
  defaultBookingFields: DefaultBookingFieldType[];
  pricingStrategy: PricingStrategyType;
  shouldPayNow: boolean;
  fields: ServiceSchemaFieldDto[];
}

export type ServiceSchemaNoId = Omit<ServiceSchemaDto, '_id'>;

export type ServiceFieldValue = string | string[];

export const getDefaultValueForServiceSchemaFieldType = (schemaFieldType: ServiceSchemaFieldType): ServiceFieldValue => {
  switch (schemaFieldType) {
    case 'string': return '';
    case 'time': return '9am';
    case 'timeframe': return '1 Hours';
  }
}

export const getDefaultValuesForServiceSchema = (serviceSchema: ServiceSchemaDto): Record<string, ServiceFieldValue> => {
  return serviceSchema.fields.reduce<Record<string, ServiceFieldValue>>(
    (acc, cur) => ({
      ...acc,
      [cur.label]: getDefaultValueForServiceSchemaFieldType(cur.type)
    }),
    {}
  )
}
