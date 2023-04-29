import axios, { AxiosInstance } from "axios";

import { INSTANCE_STORAGE_KEY } from "state/current-instance";
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

    const loggedInUser = useUserState.getState().loggedInUser;

    const instance =
      loggedInUser && loggedInUser.role === "super-admin"
        ? localStorage.getItem(INSTANCE_STORAGE_KEY) ||
          loggedInUser.instance?._id
        : loggedInUser?.instance?._id;

    config.params = { instance };

    return config;
  }, console.error);

  return httpClient;
};

export const httpClient = createHttpClient(getEnv().apiUrl + "/api/v1");
