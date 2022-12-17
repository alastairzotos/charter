import { OperatorDto, OperatorNoId } from 'dtos';
import create from 'zustand';
import { FetchStatus } from '../../models';
import { IOperatorsService, OperatorsService } from '../../services/operators.service';

export interface OperatorsStateValues {
  loadOperatorsStatus?: FetchStatus;
  operators: OperatorDto[];

  loadOperatorStatus?: FetchStatus;
  operator?: OperatorDto;

  updateOperatorStatus?: FetchStatus;
  createOperatorStatus?: FetchStatus;
  deleteOperatorStatus?: FetchStatus;
}

export interface OperatorsStateActions {
  loadOperators: () => Promise<void>;
  loadOperator: (id: string) => Promise<void>;
  updateOperator: (id: string, newOperator: Partial<OperatorDto>) => Promise<void>;
  createOperator: (operator: OperatorNoId) => Promise<void>;
  deleteOperator: (id: string) => Promise<void>;
}

export type OperatorsState = OperatorsStateValues & OperatorsStateActions;

export const createOperatorsState = (
  initialValues: OperatorsStateValues,
  operatorsService: IOperatorsService,
) =>
  create<OperatorsState>((set, self) => ({
    ...initialValues,

    loadOperators: async () => {
      try {
        set({ loadOperatorsStatus: 'fetching' });

        const operators = await operatorsService.getOperators();

        set({ loadOperatorsStatus: 'success', operators });
      } catch {
        set({ loadOperatorsStatus: 'error' });
      }
    },

    loadOperator: async (id) => {
      try {
        set({ loadOperatorStatus: 'fetching' });

        const operator = await operatorsService.getOperator(id);

        set({ loadOperatorStatus: 'success', operator });
      } catch {
        set({ loadOperatorStatus: 'error' });
      }
    },

    updateOperator: async (id, newOperator) => {
      try {
        set({ updateOperatorStatus: 'fetching' });

        await operatorsService.updateOperator(id, newOperator);

        set({ updateOperatorStatus: 'success' });
        await self().loadOperators();
      } catch {
        set({ updateOperatorStatus: 'error' });
      }
    },

    createOperator: async (operator) => {
      try {
        set({ createOperatorStatus: 'fetching' });

        await operatorsService.createOperator(operator);

        set({ createOperatorStatus: 'success' });
        await self().loadOperators();
      } catch {
        set({ createOperatorStatus: 'error' });
      }
    },

    deleteOperator: async (id) => {
      try {
        set({ deleteOperatorStatus: 'fetching' });

        await operatorsService.deleteOperator(id);

        set({ deleteOperatorStatus: 'success' });
        await self().loadOperators();
      } catch {
        set({ deleteOperatorStatus: 'error' });
      }
    }
  }))

export const useOperatorsState = createOperatorsState(
  {
    operators: []
  },
  new OperatorsService()
)
