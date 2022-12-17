export interface OperatorDto {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  photo: string;
}

export type OperatorNoId = Omit<OperatorDto, '_id'>;

export interface LoginResponse {
  accessToken: string;
}

export interface UserDetails {
  email: string;
  givenName: string;
  role?: 'user' | 'admin';
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