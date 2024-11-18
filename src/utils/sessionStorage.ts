export const setSessionStorageItem = (itemName, item) => {
  sessionStorage.setItem(itemName, JSON.stringify(item));
};

export const getSessionStorageItem = itemName => {
  const item = sessionStorage.getItem(itemName);
  return item ? JSON.parse(item) : null;
};

export const clearSessionStorageItem = itemName => {
  sessionStorage.removeItem(itemName);
};

export const clearSessionStorageItems = () => {
  sessionStorage.clear();
};
