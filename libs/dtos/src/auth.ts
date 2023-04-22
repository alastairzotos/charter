export type UserRole = 'user' | 'admin' | 'operator';

export interface LoginDetails {
  email: string;
  password: string;
}

export interface OAuthUserInfo {
  email: string;
  givenName: string;
}

export interface UserDetails extends OAuthUserInfo {
  role?: UserRole;
}

export interface RegisterDetails extends UserDetails {
  password: string;
}

export interface LoggedInUserDetails extends UserDetails {
  _id: string;
}

export interface LoginResponse {
  accessToken: string;
}
