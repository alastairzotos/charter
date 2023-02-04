export interface OperatorDto {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  photo: string;
  description: string;
}

export type OperatorNoId = Omit<OperatorDto, '_id'>;

export const serviceTypes = ['none', 'boat-trip', 'boat-rental', 'sunbed'] as const;

export type ServiceType = typeof serviceTypes[number];

export type ServiceSchemaFieldType = 'string' | 'time' | 'timeframe';

export interface ServiceSchemaFieldDto {
  field: string;
  type: ServiceSchemaFieldType;
  label: string;
}

export interface PriceDto {
  price: number;
}

export interface PerAdultAndChildPriceDto {
  adultPrice: number;
  childPrice: number;
}

export type ServicePricingDto = Partial<{
  fixed: PriceDto;
  perPerson: PriceDto;
  perAdultAndChild: PerAdultAndChildPriceDto;
}>

export type PricingStrategyType = keyof ServicePricingDto;

export interface ServiceSchemaDto {
  label: string;
  pluralLabel: string;
  description: string;
  pricingStrategy: PricingStrategyType;
  fields: ServiceSchemaFieldDto[];
}

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
      [cur.field]: getDefaultValueForServiceSchemaFieldType(cur.type)
    }),
    {}
  )
}

export interface ServiceDto {
  _id: string;
  operator: OperatorDto;
  type: ServiceType;
  name: string;
  description: string;
  price: ServicePricingDto;
  maxPeople?: number;
  minPeople?: number;
  photos: string[];
  data: Record<string, ServiceFieldValue>;
}

export type ServiceNoId = Omit<ServiceDto, '_id'>;

export type BookingStatus = 'pending' | 'confirmed' | 'rejected';

export interface PerPersonBookingPriceDetails {
  numberOfPeople: number;
}

export interface PerAdultAndChildBookingPriceDetails {
  adultGuests: number;
  childGuests: number;
}

export type BookingPriceDetails = Partial<{
  perPerson: PerPersonBookingPriceDetails;
  perAdultAndChild: PerAdultAndChildBookingPriceDetails;
}>;

export const getDefaultBookingPriceDetails = (schema: ServiceSchemaDto): BookingPriceDetails => ({
  perPerson: {
    numberOfPeople: 1,
  },
  perAdultAndChild: {
    adultGuests: 1,
    childGuests: 0,
  }
})

export interface BookingDto {
  _id: string;
  service: ServiceDto;
  operator: OperatorDto;
  name: string;
  email: string;
  date: string;
  priceDetails: BookingPriceDetails;
  status: BookingStatus;
}

export type BookingNoId = Omit<BookingDto, '_id'>;

export interface LoginResponse {
  accessToken: string;
}

export type UserRole = 'user' | 'admin' | 'operator';

export interface UserDetails {
  email: string;
  givenName: string;
  role?: UserRole;
}

export interface RegisterDetails extends UserDetails {
  password: string;
}

export interface LoginDetails {
  email: string;
  password: string;
}

export interface LoggedInUserDetails extends UserDetails {
  _id: string;
}
