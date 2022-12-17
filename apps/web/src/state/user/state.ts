import { UserDetails } from 'dtos';
import create from 'zustand';
import * as jwt from 'jsonwebtoken';

import { FetchStatus } from '../../models';
import { IUserService, UserService } from '../../services/user.service';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../util/localstorage';

const ACCESS_TOKEN_LOCALSTORAGE_KEY = 'boatrental:auth-token';

export interface UserStateValues {
  registerStatus?: FetchStatus;
  loginStatus?: FetchStatus;
  accessToken?: string;
  loggedInUser?: UserDetails;
}

export interface UserStateActions {
  initLocalStorage: () => void;

  registerUser: (givenName: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export type UserState = UserStateValues & UserStateActions;

const createUserState = (initialState: UserStateValues, userService: IUserService) =>
  create<UserState>((set, self) => ({
    ...initialState,

    initLocalStorage: () => {
      const accessToken = getLocalStorage(ACCESS_TOKEN_LOCALSTORAGE_KEY);
      if (accessToken) {
        set({ accessToken });
      }
    },

    registerUser: async (givenName, email, password) => {
      try {
        set({ registerStatus: 'fetching' });

        await userService.registerUser(givenName, email, password);

        set({ registerStatus: 'success' });
      } catch {
        set({ registerStatus: 'error' });
      }
    },

    login: async (email, password) => {
      try {
        set({ loginStatus: 'fetching' });

        const { accessToken } = await userService.loginUser(email, password);

        setLocalStorage(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
        set({
          loginStatus: 'success',
          accessToken,
          loggedInUser: jwt.decode(accessToken) as UserDetails
        });
      } catch {
        set({ loginStatus: 'error' });
      }
    },

    logout: () => {
      set({
        loginStatus: undefined,
        accessToken: undefined,
        loggedInUser: undefined,
      })

      removeLocalStorage(ACCESS_TOKEN_LOCALSTORAGE_KEY);
    }
  }))

export const useUserState = createUserState(
  {
  },
  new UserService()
);
