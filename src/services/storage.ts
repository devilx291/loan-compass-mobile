
// Simple wrapper around localStorage for client-side storage
// In a real React Native app, this would use AsyncStorage

export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data', e);
  }
};

export const getItem = async (key: string): Promise<any> => {
  try {
    const jsonValue = localStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving data', e);
    return null;
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data', e);
  }
};

export const clear = async (): Promise<void> => {
  try {
    localStorage.clear();
  } catch (e) {
    console.error('Error clearing data', e);
  }
};

export default {
  setItem,
  getItem,
  removeItem,
  clear,
};
