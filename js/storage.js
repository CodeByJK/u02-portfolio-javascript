export const getStoredItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable: the theme still works, it just isn't remembered
  }
};