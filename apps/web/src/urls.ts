
export const urls = {
  home: () => '/',
  login: () => '/login',
  register: () => '/register',
  admin: {
    operators: () => '/admin/operators',
    operatorsCreate: () => '/admin/operators/create',
    operator: (id: string) => `/admin/operators/${id}`,
  }
}
