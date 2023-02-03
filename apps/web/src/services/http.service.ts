import axios, { AxiosInstance } from "axios";

import { useUserState } from "src/state/users";
import { getEnv } from "src/util/env";

export class HttpService {
  protected httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: getEnv().apiUrl + "/api/v1",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.httpClient.interceptors.request.use((config) => {
      const accessToken = useUserState.getState().accessToken;

      if (!!accessToken) {
        config.headers!.authentication = `Bearer ${accessToken}`;
      }

      return config;
    }, console.error);
  }
}
