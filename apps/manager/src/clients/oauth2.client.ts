import { LoginResponse, OAuthUserInfo } from "dtos";

import { httpClient } from "clients/http.client";

export const loginWithFacebook = async (
  accessToken: string
): Promise<string> => {
  const { data } = await httpClient.post<
    { accessToken: string },
    { data: LoginResponse }
  >("/users/oauth/facebook", { accessToken });
  return data.accessToken;
};

export const loginWithGoogle = async (accessToken: string): Promise<string> => {
  const { data } = await httpClient.post<
    { accessToken: string },
    { data: LoginResponse }
  >("/users/oauth/google", { accessToken });
  return data.accessToken;
};
