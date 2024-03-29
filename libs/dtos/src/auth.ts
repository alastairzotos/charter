import { InstanceDto } from "./instance";

export type UserRole = "user" | "operator" | "admin" | "super-admin";

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
  instance?: InstanceDto;
}

export interface RegisterDetails extends UserDetails {
  password: string;
}

export interface ResetPasswordDetails {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface LoggedInUserDetails extends UserDetails {
  _id: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface ResetPwdOtc {
  _id: string;
  user: UserDetails;
  expires: number;
}

export type GetResetPwdOtc = ResetPwdOtc | "not-found" | "expired";

export type ResetForgottenPwdResponse = "invalid-otc" | "no-user" | "success";

export interface ResetForgottenPasswordDto {
  otcId: string;
  newPassword: string;
}
