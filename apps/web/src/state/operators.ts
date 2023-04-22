import { createQuery } from "@bitmetro/create-query";
import { OperatorNoId } from "dtos";

import {
  createOperator,
  deleteOperator,
  getOperator,
  getOperatorByOwner,
  getOperators,
  updateOperator,
} from "clients/operators.client";

export const useLoadOperators = createQuery(getOperators);
export const useLoadOperator = createQuery(getOperator);
export const useLoadOperatorByOwner = createQuery(getOperatorByOwner);
export const useUpdateOperator = createQuery(updateOperator);

export const useCreateOperator = createQuery(async (operator: OperatorNoId) => {
  const id = await createOperator(operator);
  useLoadOperators.getState().request();
  return id;
});

export const useDeleteOperator = createQuery(async (id: string) => {
  await deleteOperator(id);
  useLoadOperators.getState().request();
});
