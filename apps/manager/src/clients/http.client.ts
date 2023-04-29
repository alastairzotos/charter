import axios, { AxiosInstance } from "axios";

import { useUserState } from "state/users";
import { getEnv } from "util/env";

export const createHttpClient = (baseURL: string): AxiosInstance => {
  const httpClient = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  httpClient.interceptors.request.use((config) => {
    const accessToken = useUserState.getState().accessToken;

    if (!!accessToken) {
      config.headers!.authentication = `Bearer ${accessToken}`;
    }

    config.params = {
      instance: useUserState.getState().loggedInUser?.instance,
    };

    return config;
  }, console.error);

  return httpClient;
};

export const httpClient = createHttpClient(getEnv().apiUrl + "/api/v1");
