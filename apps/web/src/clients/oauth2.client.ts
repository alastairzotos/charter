import { FbLoginDetails, GoogleLoginRequest, LoginResponse } from "dtos";

import { httpClient } from "src/clients/http.client";

export const loginWithGoogle = async (code: string): Promise<string> => {
  const { data } = await httpClient.post<
    GoogleLoginRequest,
    { data: LoginResponse }
  >(`/oauth2/google`, { code });

  return data.accessToken;
};

export const loginWithFacebook = async (
  details: FbLoginDetails
): Promise<string> => {
  const { data } = await httpClient.post<
    FbLoginDetails,
    { data: LoginResponse }
  >("/oauth2/facebook", details);
  return data.accessToken;
};
