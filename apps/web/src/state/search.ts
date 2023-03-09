import { createQuery } from "@bitmetro/create-query";

import { searchOperatorsAndServices } from "src/clients/search.client";

export const useSearchOperatorsAndServices = createQuery(
  searchOperatorsAndServices
);
