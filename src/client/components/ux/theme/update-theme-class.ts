import { themeState } from './state';

export const updateThemeClass = () => {
    document.documentElement.setAttribute('data-theme', themeState.darkMode ? 'dark' : 'light');
};
