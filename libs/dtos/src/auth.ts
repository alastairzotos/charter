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
