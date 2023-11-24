// localStorageHelper.js

export const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const getLocalStorageItem = (key: string, parse?: boolean) => {
  if (typeof window !== "undefined") {
    const getItem: any = localStorage.getItem(key);
    const res = parse ? JSON.parse(getItem) : getItem;
    return res;
  }
  return null;
};

export const removeLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
