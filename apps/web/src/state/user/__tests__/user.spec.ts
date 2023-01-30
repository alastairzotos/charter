import { StoreApi, UseBoundStore } from "zustand"
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, createUserState, UserState } from ".."
import { LocalStorageService } from "../../../services/localstorage.service";
import { UserService } from "../../../services/user.service";

describe('User state', () => {
  const mockUserService: Pick<UserService, keyof UserService> = {
    loginUser: jest.fn(async (email: string) => new Promise(resolve => resolve({ accessToken: '123' }))),
    registerUser: jest.fn(async () => new Promise(resolve => resolve({ accessToken: '123' }))),
  }

  const localStorage: Record<string, string> = {};

  const mockLSService: Pick<LocalStorageService, keyof LocalStorageService> = {
    get: jest.fn((key, fallback) => localStorage[key] || fallback),
    set: jest.fn((key, value) => localStorage[key] = value),
    remove: jest.fn(key => delete localStorage[key])
  }

  describe('Register', () => {
    let store: UseBoundStore<StoreApi<UserState>>;
    
    beforeAll(async () => {
      store = createUserState(
        {
          initialised: false
        },
        mockUserService,
        mockLSService
      )

      store.getState().initLocalStorage();

      await store.getState().registerUser('foo', 'foo@bar.com', 'password');
    })

    it('should call the user service', () => {
      expect(mockUserService.registerUser).toHaveBeenCalledWith('foo', 'foo@bar.com', 'password');
    })
  })

  describe('Login', () => {
    let store: UseBoundStore<StoreApi<UserState>>;

    beforeAll(async () => {
      store = createUserState(
        {
          initialised: false
        },
        mockUserService,
        mockLSService
      )

      store.getState().initLocalStorage();

      await store.getState().login('user', 'password');
    })

    it('should call the user service', () => {
      expect(mockUserService.loginUser).toHaveBeenCalledWith('user', 'password');
    })

    it('should set the access token in local storage', () => {
      expect(mockLSService.set).toHaveBeenCalledWith(ACCESS_TOKEN_LOCALSTORAGE_KEY, '123');
      expect(localStorage[ACCESS_TOKEN_LOCALSTORAGE_KEY]).toEqual('123')
    })
  })

  describe('Logout', () => {
    let store: UseBoundStore<StoreApi<UserState>>;
    
    beforeAll(async () => {
      store = createUserState(
        {
          initialised: false
        },
        mockUserService,
        mockLSService
      )

      store.getState().initLocalStorage();

      await store.getState().login('user', 'password');
      store.getState().logout();
    })

    it('should call the user service', () => {
      expect(mockUserService.loginUser).toHaveBeenCalledWith('user', 'password');
    })

    it('should set the access token in local storage', () => {
      expect(mockLSService.set).toHaveBeenCalledWith(ACCESS_TOKEN_LOCALSTORAGE_KEY, '123');
    })

    it('should clear the access token from localstorage', () => {
      expect(mockLSService.remove).toHaveBeenCalledWith(ACCESS_TOKEN_LOCALSTORAGE_KEY);
    })
  })
})
