export class LocalStorageService {
  set(key: string, value: string): void {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
    }
  }

  get(key: string, fallback: string | null = null): any {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key) || fallback;
    }

    return fallback;
  }

  remove(key: string): void {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
    }
  }
}

export const localStorageService = new LocalStorageService();
