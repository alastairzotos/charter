import {
  LoggedInUserDetails,
  LoginDetails,
  LoginResponse,
  RegisterDetails,
  ResetPasswordDetails,
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
}
