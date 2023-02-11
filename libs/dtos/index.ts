import dayjs from "dayjs";

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

export const serviceTypes = ['none', 'boat-trip', 'boat-rental', 'sunbed', 'watersports', 'restaurant'] as const;

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
  tiered: TieredPriceDto;
}>

export type PricingStrategyType = keyof ServicePricingDto;

export type DefaultBookingFieldType = keyof DefaultBookingFields;

export interface ServiceSchemaDto {
  label: string;
  pluralLabel: string;
  description: string;
  defaultBookingFields: DefaultBookingFieldType[];
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
  maxPeople: number | null;
  minPeople: number | null;
  photos: string[];
  data: Record<string, ServiceFieldValue>;
  numberOfBookings: number;
}

export type ServiceNoId = Omit<ServiceDto, '_id'>;

export type BookingStatus = 'pending' | 'confirmed' | 'rejected';
export type BookingPaymentStatus = 'pending' | 'succeeded' | 'failed' | 'cancelled';

export interface PerPersonBookingPriceDetails {
  numberOfPeople: number;
}

export interface PerAdultAndChildBookingPriceDetails {
  adultGuests: number;
  childGuests: number;
}

export interface TieredBookingPriceDetails {
  tier?: string;
}

export type BookingPriceDetails = Partial<{
  perPerson: PerPersonBookingPriceDetails;
  perAdultAndChild: PerAdultAndChildBookingPriceDetails;
  tiered: TieredBookingPriceDetails;
}>;

export const getDefaultBookingPriceDetails = (schema: ServiceSchemaDto): BookingPriceDetails => ({
  perPerson: {
    numberOfPeople: 1,
  },
  perAdultAndChild: {
    adultGuests: 1,
    childGuests: 0,
  },
  tiered: {
    tier: ''
  },
})

export interface DefaultBookingFields {
  date?: string;
  time?: string;
  numberOfPeople?: number;
}

export const getDefaultDefaultBookingFields = (schema: ServiceSchemaDto): DefaultBookingFields => {
  return {
    date: schema.defaultBookingFields.includes('date') ? dayjs().add(1, "day").format("DD MMM YYYY") : undefined,
    time: schema.defaultBookingFields.includes('time') ? '09:00' : undefined,
    numberOfPeople: schema.defaultBookingFields.includes('numberOfPeople') ? 1 : 0,
  }
}

export interface BookingDto extends DefaultBookingFields {
  _id: string;
  service: ServiceDto;
  operator: OperatorDto;
  name: string;
  email: string;
  bookingDate?: Date;
  priceDetails: BookingPriceDetails;
  paymentIntentId?: string;
  paymentStatus?: BookingPaymentStatus;
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

export interface CreatePaymentIntentDto {
  bookingId: string;
}
