import {
  GetResetPwdOtc,
  LoggedInUserDetails,
  LoginDetails,
  LoginResponse,
  RegisterDetails,
  ResetForgottenPasswordDto,
  ResetForgottenPwdResponse,
  ResetPasswordDetails,
  ResetPwdOtc,
} from "dtos";

import { httpClient } from "clients/http.client";

export class UserService {
  async getUsers(): Promise<LoggedInUserDetails[]> {
    const { data } = await httpClient.get<LoggedInUserDetails[]>("/users");

    return data;
  }

  async registerUser(
    givenName: string,
    email: string,
    password: string
  ): Promise<LoginResponse> {
    const { data } = await httpClient.post<
      any,
      { data: LoginResponse },
      RegisterDetails
    >("/users", { givenName, email, password });

    return data;
  }

  async resetPassword(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Promise<LoginResponse> {
    const { data } = await httpClient.post<
      any,
      { data: LoginResponse },
      ResetPasswordDetails
    >("/users/reset-password", { email, oldPassword, newPassword });

    return data;
  }

  async loginUser(email: string, password: string): Promise<LoginResponse> {
    const { data } = await httpClient.post<
      any,
      { data: LoginResponse },
      LoginDetails
    >("/users/login", { email, password });

    return data;
  }

  async deleteUser(email: string) {
    await httpClient.delete<any, unknown, { email: string }>("/users", {
      data: { email },
    });
  }

  async refreshToken() {
    const { data } = await httpClient.post<
      any,
      { data: string | null },
      unknown
    >("/users/refresh-token");

    return data;
  }

  async sendForgotPasswordEmail(email: string) {
    await httpClient.post<{ email: string }, unknown>(
      "/users/send-forgot-password-email",
      { email }
    );
  }

  async getResetPwdOtcIdFromCode(code: string): Promise<GetResetPwdOtc> {
    const { data } = await httpClient.get<GetResetPwdOtc>(
      `/users/reset-pwd-otc/${code}`
    );

    return data;
  }

  async resetForgottenPassword(
    otcId: string,
    newPassword: string
  ): Promise<ResetForgottenPwdResponse> {
    const { data } = await httpClient.post<
      ResetForgottenPasswordDto,
      { data: ResetForgottenPwdResponse },
      unknown
    >("/users/reset-forgotten-password", { otcId, newPassword });

    return data;
  }
}

export const usersService = new UserService();
