export const setLocalStorage = (key: string, value: string) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

export const getLocalStorage = (key: string, fallback: any = null) => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }

  return fallback;
}

export const removeLocalStorage = (key: string) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(key);
  }
}
