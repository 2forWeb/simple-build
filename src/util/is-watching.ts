export function isWatching() {
    return process.argv.some((arg) => arg.startsWith('watch'));
}
