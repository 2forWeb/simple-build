/*
    \x1b[31m: Red
    \x1b[32m: Green
    \x1b[33m: Yellow
    \x1b[34m: Blue
    \x1b[35m: Magenta
    \x1b[36m: Cyan
    \x1b[37m: White
*/

// ANSI escape codes for text color
export const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    white: '\x1b[37m',
    reset: '\x1b[0m',

    bold: '\x1b[1m',
    resetBold: '\x1b[22m',
};

export const color = (color: keyof typeof colors, text: string) => `${colors[color]}${text}${colors.reset}`;

export const bold = (text: string) => `${colors.bold}${text}${colors.resetBold}`;
