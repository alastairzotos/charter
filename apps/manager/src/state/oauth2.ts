import { createQuery } from "@bitmetro/create-query";

import { localStorageService } from "clients/localstorage.service";
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, useUserState } from "state/users";

export const useOAuthLogin = createQuery(async (accessToken: string) => {
  localStorageService.set(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
  useUserState.getState().initLocalStorage();
});
