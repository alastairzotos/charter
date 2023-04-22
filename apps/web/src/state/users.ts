import { FetchStatus } from "@bitmetro/create-query";
import { LoggedInUserDetails, UserDetails } from "dtos";
import * as jwt from "jsonwebtoken";
import { ExtractInterface } from "utils";
import create from "zustand";

import {
  localStorageService,
  LocalStorageService,
} from "clients/localstorage.service";
import { UserService } from "clients/user.service";

export const ACCESS_TOKEN_LOCALSTORAGE_KEY = "boatrental:auth-token";

export interface UserStateValues {
  initialised: boolean;
  registerStatus?: FetchStatus;
  loginStatus?: FetchStatus;
  accessToken?: string;
  loggedInUser?: UserDetails;
  deleteUserStatus?: FetchStatus;
  userList?: LoggedInUserDetails[];
  getUserListStatus?: FetchStatus;
}

export interface UserStateActions {
  initLocalStorage: () => void;

  getUsers: () => Promise<void>;

  registerUser: (
    givenName: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;

  deleteUser: () => Promise<boolean>;
}

export type UserState = UserStateValues & UserStateActions;

export const createUserState = (
  initialState: UserStateValues,
  userService: ExtractInterface<UserService>,
  localStorage: ExtractInterface<LocalStorageService>
) =>
  create<UserState>((set, self) => ({
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

    getUsers: async () => {
      try {
        set({ getUserListStatus: "fetching" });

        const userList = await userService.getUsers();

        set({
          getUserListStatus: "success",
          userList: userList.filter(
            (user) => !!user.email && !!user.email.length
          ),
        });
      } catch {
        set({ getUserListStatus: "error" });
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

    deleteUser: async () => {
      try {
        set({ deleteUserStatus: "fetching" });

        if (!self().loggedInUser) {
          throw new Error("No user object");
        }

        await userService.deleteUser(self().loggedInUser?.email || "");

        set({ deleteUserStatus: "success" });
        self().logout();
        return true;
      } catch {
        set({ deleteUserStatus: "error" });

        return false;
      }
    },
  }));

export const useUserState = createUserState(
  {
    initialised: false,
  },
  new UserService(),
  localStorageService
);
