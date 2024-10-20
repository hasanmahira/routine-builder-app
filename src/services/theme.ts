import { Application } from '@nativescript/core';

export type Theme = 'light' | 'dark';

export const setTheme = (theme: Theme) => {
  Application.setResources({
    theme: theme === 'dark' ? 'dark' : 'light',
  });
};

export const getTheme = (): Theme => {
  return Application.getResources().theme === 'dark' ? 'dark' : 'light';
};