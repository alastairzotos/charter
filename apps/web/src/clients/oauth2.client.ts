import { LoginResponse, OAuthUserInfo } from "dtos";

import { httpClient } from "clients/http.client";

export const login = async (details: OAuthUserInfo): Promise<string> => {
  const { data } = await httpClient.post<
    OAuthUserInfo,
    { data: LoginResponse }
  >("/oauth2/implicit", details);
  return data.accessToken;
};

export const fetchFbUserInfo = async (
  fbAccessToken: string
): Promise<OAuthUserInfo> => {
  const userInfoResponse = await fetch(
    `https://graph.facebook.com/me?access_token=${fbAccessToken}&fields=email,first_name`
  );

  const result = await userInfoResponse.json();

  return {
    email: result.email,
    givenName: result.first_name,
  };
};

export const fetchGoogleUserInfo = async (
  googleAccessToken: string
): Promise<OAuthUserInfo> => {
  const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: { Authorization: `Bearer ${googleAccessToken}` },
  });

  const result = await response.json();

  return {
    email: result.email,
    givenName: result.given_name,
  };
};
