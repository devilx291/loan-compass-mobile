
import { Preferences } from '@capacitor/preferences';

// This wrapper around Capacitor Preferences for client-side storage
// works for both web and native mobile apps

export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await Preferences.set({ key, value: jsonValue });
  } catch (e) {
    console.error('Error storing data', e);
  }
};

export const getItem = async (key: string): Promise<any> => {
  try {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Error retrieving data', e);
    return null;
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await Preferences.remove({ key });
  } catch (e) {
    console.error('Error removing data', e);
  }
};

export const clear = async (): Promise<void> => {
  try {
    await Preferences.clear();
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
