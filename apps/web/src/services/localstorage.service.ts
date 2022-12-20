export class LocalStorageService {
  set(key: string, value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  get(key: string, fallback = null): any {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
  
    return fallback;
  }

  remove(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}
