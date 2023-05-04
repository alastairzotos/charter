import { createQuery } from "@bitmetro/create-query";

import {
  getConfiguration,
  updateConfiguration,
} from "clients/configuration.client";

export const useGetConfiguration = createQuery(getConfiguration);
export const useUpdateConfiguration = createQuery(updateConfiguration);
