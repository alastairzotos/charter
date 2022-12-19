
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
  }
}
