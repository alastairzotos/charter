import { paramCase } from 'change-case';
import { OperatorDto, TripDto } from "dtos";

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
    tripsCreate: (operatorId: string) => `/admin/operators/${operatorId}/trips/create`,
    trip: (operatorId: string, id: string) => `/admin/operators/${operatorId}/trips/${id}`
  },
  user: {
    operators: () => '/operators',
    operator: ({ _id, name }: OperatorDto) => `/operator/${paramCase(name)}-${_id}`,
    trip: (trip: TripDto) => `/trip/${trip._id}`,
    booking: (id: string) => `/booking/${id}`
  },
  operators: {
    home: () => '/operator-admin',
    booking: (id: string) => `/operator-admin/booking/${id}`
  }
} satisfies Urls;
