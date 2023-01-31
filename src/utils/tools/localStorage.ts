export const myLocalStorage = {
  setValue: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getValue: (key: string): any => {
    return JSON.parse(localStorage.getItem(key));
  },
};
