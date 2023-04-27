import { createHttpClient } from "@bitmetro/http-client";

import { useUserState } from "state/users";
import { getEnv } from "util/env";

export const httpClient = createHttpClient(
  getEnv().apiUrl + "/api/v1",
  () => useUserState.getState().accessToken
);
