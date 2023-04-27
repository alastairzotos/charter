import { createHttpClient } from "@bitmetro/http-client";

import { getEnv } from "util/env";

export const httpClient = createHttpClient(getEnv().apiUrl + "/api/v1");
