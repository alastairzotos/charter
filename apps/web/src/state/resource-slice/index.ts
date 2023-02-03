import create from "zustand";

export type FetchStatus = "fetching" | "success" | "error";

export interface SliceValues<T> {
  status?: FetchStatus;
  value: T | null;
}

export interface SliceActions<A extends any[]> {
  request: (...args: A) => Promise<void>;
}

export type SliceState<T, A extends any[]> = SliceValues<T> & SliceActions<A>;

export const createSlice = <T, A extends any[] = []>(
  initialValue: T | null,
  request: (...args: A) => Promise<T>
) =>
  create<SliceState<T, A>>((set) => ({
    value: initialValue,

    request: async (...args) => {
      try {
        set({ status: "fetching" });

        const value = await request(...args);

        set({ status: "success", value });
      } catch {
        set({ status: "error" });
      }
    },
  }));
