import { getCookie, setCookie } from '../../../utils/cookie';
import { getPreferredColorTheme } from './get-preferred-color-theme';
import { themeState } from './state';

export const loadPreferredTheme = () => {
    if (!getCookie('theme')) {
        setCookie('theme', getPreferredColorTheme());
    }

    themeState.darkMode = getCookie('theme') === 'dark';
};
