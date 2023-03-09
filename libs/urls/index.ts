import { paramCase } from 'change-case';
import { OperatorDto, ServiceDto, ServiceSchemaCategoryDto } from "dtos";

type UrlFn = (...args: any[]) => string;

interface Urls {
  [key: string]: UrlFn | Urls;
}

export const urls = {
  home: () => '/',
  login: () => '/login',
  register: () => '/register',
  account: () => '/account',
  admin: {
    home: () => '/admin',
    operators: () => '/admin/operators',
    operatorsCreate: () => '/admin/operators/create',
    operator: (id: string) => `/admin/operators/${id}`,
    operatorEdit: (id: string) => `/admin/operators/${id}/edit`,
    servicesCreate: (operatorId: string, schemaId: string) => `/admin/operators/${operatorId}/services/create?schemaId=${schemaId}`,
    service: (operatorId: string, id: string) => `/admin/operators/${operatorId}/services/${id}`,
    serviceSchemas: () => `/admin/service-schemas`,
    serviceSchema: (id: string) => `/admin/service-schemas/${id}`,
    serviceSchemaCreate: () => `/admin/service-schemas/create`,
    serviceSchemaCategories: () => '/admin/service-schema-categories',
    serviceSchemaCategory: (id: string) => `/admin/service-schema-categories/${id}`,
    serviceSchemaCategoryCreate: () => '/admin/service-schema-categories/create',
    bookings: () => '/admin/bookings',
    operatorBookings: (operatorId: string) => `/admin/bookings/${operatorId}`,
    operatorBooking: (operatorId: string, bookingId: string) => `/admin/bookings/${operatorId}/${bookingId}`,
  },
  user: {
    operators: () => '/operators',
    operator: ({ _id, name }: OperatorDto) => `/operator/${paramCase(name)}-${_id}`,
    service: (service: ServiceDto) => `/service/${service._id}`,
    booking: (id: string) => `/booking/${id}`,
    services: () => '/services',
    serviceCategory: (category: ServiceSchemaCategoryDto) => `/type/${paramCase(category.pluralName)}-${category._id}`,
    terms: () => '/legal/terms',
    privacy: () => '/legal/privacy',
  },
  operators: {
    home: () => '/operator-admin',
    booking: (id: string) => `/operator-admin/booking/${id}`
  }
} satisfies Urls;
