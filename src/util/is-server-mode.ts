export function isServerMode() {
    return process.argv.some((arg) => arg.startsWith('serve'));
}
