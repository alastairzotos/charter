import { LoginDetails, LoginResponse, RegisterDetails } from "dtos";
import { HttpService } from "./http.service";

export interface IUserService {
  registerUser(name: string, email: string, password: string): Promise<LoginResponse>;
  loginUser(email: string, password: string): Promise<LoginResponse>;
}

export class UserService extends HttpService implements IUserService {
  async registerUser(givenName: string, email: string, password: string): Promise<LoginResponse> {
    const { data } = await this.httpClient.post<any, { data: LoginResponse }, RegisterDetails>('/users', { givenName, email, password })

    return data;
  }

  async loginUser(email: string, password: string): Promise<LoginResponse> {
    const { data } = await this.httpClient.post<any, { data: LoginResponse }, LoginDetails>('/users/login', { email, password })

    return data;
  }
}
