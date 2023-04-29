import axios, { AxiosInstance } from "axios";

import { getEnv } from "util/env";

export const createHttpClient = (baseURL: string): AxiosInstance => {
  const httpClient = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  httpClient.interceptors.request.use((config) => {
    config.params = {
      instance: getEnv().instanceId,
    };

    return config;
  }, console.error);

  return httpClient;
};

export const httpClient = createHttpClient(getEnv().apiUrl + "/api/v1");
