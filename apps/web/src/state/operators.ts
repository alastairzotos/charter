import { createQuery } from "@bitmetro/create-query";

import {
  createOperator,
  deleteOperator,
  getOperator,
  getOperators,
  updateOperator,
} from "src/clients/operators.client";

export const useLoadOperators = createQuery(getOperators);
export const useLoadOperator = createQuery(getOperator);
export const useUpdateOperator = createQuery(updateOperator);

export const useCreateOperator = createQuery(async (operator) => {
  const id = await createOperator(operator);
  useLoadOperators.getState().request();
  return id;
});

export const useDeleteOperator = createQuery(async (id) => {
  await deleteOperator(id);
  useLoadOperators.getState().request();
});
