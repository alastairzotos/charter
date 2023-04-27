import { createQuery } from "@bitmetro/create-query";

import { getOperators } from "clients/operators.client";

export const useLoadOperators = createQuery(getOperators);
