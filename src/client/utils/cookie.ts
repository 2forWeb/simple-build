export const getCookie = (name: string): string | undefined =>
    document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${name}=`))
        ?.split('=')[1];

export const setCookie = (name: string, value: string) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    const domain = window.location.hostname;
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; samesite=lax; path=/; domain=${domain}`;
};
