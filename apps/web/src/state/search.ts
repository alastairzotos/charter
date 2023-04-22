import { createQuery } from "@bitmetro/create-query";

import { searchOperatorsAndServices } from "clients/search.client";

export const useSearchOperatorsAndServices = createQuery(
  searchOperatorsAndServices
);
