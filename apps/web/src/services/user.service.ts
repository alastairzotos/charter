import { LoginDetails, LoginResponse, RegisterDetails } from "dtos";

import { HttpService } from "src/services/http.service";

export class UserService extends HttpService {
  async registerUser(
    givenName: string,
    email: string,
    password: string
  ): Promise<LoginResponse> {
    const { data } = await this.httpClient.post<
      any,
      { data: LoginResponse },
      RegisterDetails
    >("/users", { givenName, email, password });

    return data;
  }

  async loginUser(email: string, password: string): Promise<LoginResponse> {
    const { data } = await this.httpClient.post<
      any,
      { data: LoginResponse },
      LoginDetails
    >("/users/login", { email, password });

    return data;
  }
}
