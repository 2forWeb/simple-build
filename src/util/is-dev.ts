import 'dotenv/config';

export function isDev() {
    return process.env.APP_ENV === 'dev';
}
