import { createQuery } from "@bitmetro/create-query";
import { OAuthUserInfo } from "dtos";

import { localStorageService } from "src/clients/localstorage.service";
import { login } from "src/clients/oauth2.client";
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, useUserState } from "src/state/users";

export const useOAuthLogin = createQuery(async (details: OAuthUserInfo) => {
  const accessToken = await login(details);
  localStorageService.set(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
  useUserState.getState().initLocalStorage();
});
