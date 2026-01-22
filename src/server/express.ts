import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { versionRoute } from '@server/routes/version.js';
import { configFilesRoute } from '@server/routes/config-files';
import { bold, color } from '@util/colors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function startExpressServer() {
    const app = express();
    let port = 3333;

    const portArg = process.argv.find((arg) => arg.startsWith('--port'));

    if (portArg) {
        const portValue = portArg.split('=')[1];
        if (portValue) {
            const parsedPort = parseInt(portValue, 10);
            if (!isNaN(parsedPort)) {
                port = parsedPort;
            }
        }
    }

    const publicDir = resolve(__dirname, '../public');
    app.use(express.static(publicDir));

    versionRoute(app);
    configFilesRoute(app);

    app.listen(port, () => {
        console.log(
            color('blue', 'Simple-Build') + color('white', ' Listening on port ') + bold(color('yellow', port.toString()))
        );
    });
}
