import { FetchStatus } from "@bitmetro/create-query";
import { LoggedInUserDetails, UserDetails } from "dtos";
import * as jwt from "jsonwebtoken";
import { ExtractInterface } from "utils";
import create from "zustand";

import {
  localStorageService,
  LocalStorageService,
} from "clients/localstorage.service";
import { UserService, usersService } from "clients/user.service";

export const ACCESS_TOKEN_LOCALSTORAGE_KEY = "boatrental:auth-token";

export interface UserStateValues {
  initialised: boolean;
  registerStatus?: FetchStatus;
  loginStatus?: FetchStatus;
  resetPasswordStatus?: FetchStatus;
  accessToken?: string;
  loggedInUser?: UserDetails;
  deleteUserStatus?: FetchStatus;
  userList?: LoggedInUserDetails[];
  getUserListStatus?: FetchStatus;
  refreshTokenStatus?: FetchStatus;
  sendForgotPasswordEmailStatus?: FetchStatus;
  resetForgottenPasswordStatus?: FetchStatus;
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
  resetPassword: (
    email: string,
    oldPassword: string,
    newPassword: string
  ) => Promise<void>;
  logout: () => void;

  deleteUser: () => Promise<boolean>;

  refreshToken: () => Promise<void>;

  sendForgotPasswordEmail: (email: string) => Promise<void>;

  resetForgottenPassword: (otcId: string, newPassword: string) => Promise<void>;
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

    resetPassword: async (email, oldPassword, newPassword) => {
      try {
        set({ resetPasswordStatus: "fetching" });

        await userService.resetPassword(email, oldPassword, newPassword);

        set({ resetPasswordStatus: "success" });
      } catch {
        set({ resetPasswordStatus: "error" });
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

    refreshToken: async () => {
      try {
        set({ refreshTokenStatus: "fetching" });

        const accessToken = await userService.refreshToken();

        if (accessToken) {
          localStorage.set(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);

          set({
            refreshTokenStatus: "success",
            accessToken,
            loggedInUser: jwt.decode(accessToken) as UserDetails,
          });
        } else {
          set({ refreshTokenStatus: "success" });
        }
      } catch {
        set({ refreshTokenStatus: "error" });
      }
    },

    sendForgotPasswordEmail: async (email: string) => {
      try {
        set({ sendForgotPasswordEmailStatus: "fetching" });

        await userService.sendForgotPasswordEmail(email);

        set({ sendForgotPasswordEmailStatus: "success" });
      } catch {
        set({ sendForgotPasswordEmailStatus: "error" });
      }
    },

    resetForgottenPassword: async (otcId, newPassword) => {
      try {
        set({ resetForgottenPasswordStatus: "fetching" });

        await userService.resetForgottenPassword(otcId, newPassword);

        set({ resetForgottenPasswordStatus: "success" });
      } catch {
        set({ resetForgottenPasswordStatus: "error" });
      }
    },
  }));

export const useUserState = createUserState(
  {
    initialised: false,
  },
  usersService,
  localStorageService
);
