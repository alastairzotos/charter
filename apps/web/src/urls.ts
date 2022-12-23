import kebabCase from 'just-kebab-case';
import { OperatorDto, TripDto } from "dtos";

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
    operator: ({ _id, name }: OperatorDto) => `/operator/${kebabCase(name)}-${_id}`,
    trip: (trip: TripDto) => `/trip/${trip._id}`
  }
}
