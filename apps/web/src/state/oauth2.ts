import { createQuery } from "@bitmetro/create-query";
import { CodeResponse } from "@react-oauth/google";
import { FbLoginDetails } from "dtos";

import { localStorageService } from "src/clients/localstorage.service";
import { loginWithFacebook, loginWithGoogle } from "src/clients/oauth2.client";
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, useUserState } from "src/state/users";

export const useLoginWithGoogle = createQuery(
  async (
    response: Omit<CodeResponse, "error" | "error_description" | "error_uri">
  ) => {
    const accessToken = await loginWithGoogle(response.code);
    localStorageService.set(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
    useUserState.getState().initLocalStorage();
  }
);

export const useLoginWithFacebook = createQuery(
  async (response: FbLoginDetails) => {
    const accessToken = await loginWithFacebook(response);
    localStorageService.set(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
    useUserState.getState().initLocalStorage();
  }
);
