import { paramCase } from 'change-case';
import { OperatorDto, ServiceDto, ServiceType } from "dtos";

type UrlFn = (...args: any[]) => string;

interface Urls {
  [key: string]: UrlFn | Urls;
}

export const urls = {
  home: () => '/',
  login: () => '/login',
  register: () => '/register',
  admin: {
    home: () => '/admin',
    operators: () => '/admin/operators',
    operatorsCreate: () => '/admin/operators/create',
    operator: (id: string) => `/admin/operators/${id}`,
    operatorEdit: (id: string) => `/admin/operators/${id}/edit`,
    servicesCreate: (operatorId: string, type: ServiceType) => `/admin/operators/${operatorId}/services/create?type=${type}`,
    service: (operatorId: string, id: string) => `/admin/operators/${operatorId}/services/${id}`
  },
  user: {
    operators: () => '/operators',
    operator: ({ _id, name }: OperatorDto) => `/operator/${paramCase(name)}-${_id}`,
    service: (service: ServiceDto) => `/service/${service._id}`,
    booking: (id: string) => `/booking/${id}`
  },
  operators: {
    home: () => '/operator-admin',
    booking: (id: string) => `/operator-admin/booking/${id}`
  }
} satisfies Urls;
