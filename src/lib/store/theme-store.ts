// src/lib/theme/theme-store.ts
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

function createThemeStore() {
  const { subscribe, set } = writable<Theme>('light');

  return {
    subscribe,
    setTheme: (theme: Theme) => {
      set(theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    },
    init: () => {
      // 1. Cek localStorage
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved) {
        set(saved);
        document.documentElement.classList.toggle('dark', saved === 'dark');
        return;
      }

      // 2. Cek sistem
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        set('dark');
        document.documentElement.classList.add('dark');
      } else {
        set('light');
        document.documentElement.classList.remove('dark');
      }
    }
  };
}

export const theme = createThemeStore();
