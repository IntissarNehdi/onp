export const saveToLocalStorage = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const getFromLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  export const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };
  