import { OperatorDto, OperatorNoId } from "dtos";

import { OperatorsService } from "src/services/operators.service";
import { createSlice } from "src/state/resource-slice";

const svc = new OperatorsService();

export const useLoadOperators = createSlice<OperatorDto[]>(
  [],
  async () => await svc.getOperators()
);
export const useLoadOperator = createSlice<OperatorDto, [string]>(
  null,
  async (id) => await svc.getOperator(id)
);
export const useUpdateOperator = createSlice<
  void,
  [string, Partial<OperatorDto>]
>(null, async (id, newOperator) => await svc.updateOperator(id, newOperator));
export const useCreateOperator = createSlice<string, [OperatorNoId]>(
  null,
  async (operator) => {
    const id = await svc.createOperator(operator);
    useLoadOperators.getState().request();
    return id;
  }
);
export const useDeleteOperator = createSlice<void, [string]>(
  null,
  async (id) => {
    await svc.deleteOperator(id);
    useLoadOperators.getState().request();
  }
);
