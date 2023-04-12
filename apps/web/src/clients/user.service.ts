import {
  LoggedInUserDetails,
  LoginDetails,
  LoginResponse,
  RegisterDetails,
} from "dtos";

import { httpClient } from "src/clients/http.client";

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
}
