import create, { Mutate, StoreApi } from "zustand";

export type FetchStatus = "fetching" | "success" | "error";

export interface SliceValues<T> {
  status?: FetchStatus;
  value: T | null;
}

export interface SliceActions<A extends any[]> {
  request: (...args: A) => Promise<void>;
}

export type SliceState<T, A extends any[]> = SliceValues<T> & SliceActions<A>;

type Get<T, K, F> = K extends keyof T ? T[K] : F;

type HookFn<T, A extends any[]> = (
  setState: Get<Mutate<StoreApi<SliceState<T, A>>, []>, "setState", never>,
  getState: Get<Mutate<StoreApi<SliceState<T, A>>, []>, "getState", never>
) => void;

export const createSlice = <T, A extends any[] = []>(
  initialValue: T | null,
  request: (...args: A) => Promise<T>,
  opts?: {
    beforeRequest?: HookFn<T, A>;
    afterRequest?: HookFn<T, A>;
  }
) =>
  create<SliceState<T, A>>((set, self) => ({
    value: initialValue,

    request: async (...args) => {
      const beforeRequest = opts?.beforeRequest;
      const afterRequest = opts?.afterRequest;

      try {
        beforeRequest?.(set, self);
        set({ status: "fetching" });

        const value = await request(...args);

        set({ status: "success", value });

        afterRequest?.(set, self);
      } catch {
        set({ status: "error" });
      }
    },
  }));
