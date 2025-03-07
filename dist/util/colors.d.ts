export declare const colors: {
    red: string;
    green: string;
    blue: string;
    yellow: string;
    white: string;
    reset: string;
    bold: string;
    resetBold: string;
};
export declare const color: (color: keyof typeof colors, text: string) => string;
export declare const bold: (text: string) => string;
