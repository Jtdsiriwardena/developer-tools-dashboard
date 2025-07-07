import type { PersistStorage, StorageValue } from 'zustand/middleware';
import type { ThemeState } from '@/store/themeStore';

const localStoragePersist: PersistStorage<ThemeState> = {
  getItem: (name: string): Promise<StorageValue<ThemeState> | null> => {
    const value = localStorage.getItem(name);
    if (!value) return Promise.resolve(null);
    try {
      return Promise.resolve(JSON.parse(value));
    } catch {
      return Promise.resolve(null);
    }
  },

  setItem: (name: string, value: StorageValue<ThemeState>): Promise<void> => {
    localStorage.setItem(name, JSON.stringify(value));
    return Promise.resolve();
  },

  removeItem: (name: string): Promise<void> => {
    localStorage.removeItem(name);
    return Promise.resolve();
  },
};

export default localStoragePersist;
