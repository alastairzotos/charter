import { UserDetails } from "dtos";
import * as jwt from "jsonwebtoken";
import { ExtractInterface } from "utils";
import create from "zustand";

import { LocalStorageService } from "src/services/localstorage.service";
import { UserService } from "src/services/user.service";
import { FetchStatus } from "src/state/slice";

export const ACCESS_TOKEN_LOCALSTORAGE_KEY = "boatrental:auth-token";

export interface UserStateValues {
  initialised: boolean;
  registerStatus?: FetchStatus;
  loginStatus?: FetchStatus;
  accessToken?: string;
  loggedInUser?: UserDetails;
}

export interface UserStateActions {
  initLocalStorage: () => void;

  registerUser: (
    givenName: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export type UserState = UserStateValues & UserStateActions;

export const createUserState = (
  initialState: UserStateValues,
  userService: ExtractInterface<UserService>,
  localStorage: ExtractInterface<LocalStorageService>
) =>
  create<UserState>((set) => ({
    ...initialState,

    initLocalStorage: () => {
      const accessToken = localStorage.get(ACCESS_TOKEN_LOCALSTORAGE_KEY);
      if (accessToken) {
        set({
          initialised: true,
          accessToken,
          loggedInUser: jwt.decode(accessToken) as UserDetails,
        });
      } else {
        set({ initialised: true });
      }
    },

    registerUser: async (givenName, email, password) => {
      try {
        set({ registerStatus: "fetching" });

        await userService.registerUser(givenName, email, password);

        set({ registerStatus: "success" });
      } catch {
        set({ registerStatus: "error" });
      }
    },

    login: async (email, password) => {
      try {
        set({ loginStatus: "fetching" });

        const { accessToken } = await userService.loginUser(email, password);

        localStorage.set(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);

        set({
          loginStatus: "success",
          accessToken,
          loggedInUser: jwt.decode(accessToken) as UserDetails,
        });
      } catch {
        set({ loginStatus: "error" });
      }
    },

    logout: () => {
      set({
        loginStatus: undefined,
        accessToken: undefined,
        loggedInUser: undefined,
      });

      localStorage.remove(ACCESS_TOKEN_LOCALSTORAGE_KEY);
    },
  }));

export const useUserState = createUserState(
  {
    initialised: false,
  },
  new UserService(),
  new LocalStorageService()
);
