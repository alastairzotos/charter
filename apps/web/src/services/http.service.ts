import { createHttpClient } from "@bitmetro/http-client";

import { useUserState } from "src/state/users";
import { getEnv } from "src/util/env";

export const httpClient = createHttpClient(
  getEnv().apiUrl + "/api/v1",
  () => useUserState.getState().accessToken
);
