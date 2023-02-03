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

export const serviceTypes = ['none', 'boat', 'sunbed'] as const;

export type ServiceType = typeof serviceTypes[number];

export const getServiceTypeLabel = (serviceType: ServiceType): string => ({
  none: 'None',
  boat: 'Boat trip',
  sunbed: 'Sun bed'
} as Record<ServiceType, string>)[serviceType]

export type ServiceSchemaFieldType = 'string' | 'time' | 'timeframe' | 'photos';

export interface ServiceSchemaFieldDto {
  field: string;
  type: ServiceSchemaFieldType;
  label: string;
}

export interface ServiceSchemaDto {
  fields: ServiceSchemaFieldDto[];
}

export type ServiceFieldValue = string | string[];

export const getDefaultValueForServiceSchemaFieldType = (schemaFieldType: ServiceSchemaFieldType): ServiceFieldValue => {
  switch (schemaFieldType) {
    case 'string': return '';
    case 'time': return '9am';
    case 'timeframe': return '1 hour';
    case 'photos': return [];
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
  adultPrice: number;
  childPrice: number;
  data: Record<string, ServiceFieldValue>;
}

export type ServiceNoId = Omit<ServiceDto, '_id'>;

export type BookingStatus = 'pending' | 'confirmed' | 'rejected';

export interface BookingDto {
  _id: string;
  service: ServiceDto;
  operator: OperatorDto;
  name: string;
  email: string;
  date: string;
  adultGuests: number;
  childGuests: number;
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
