import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { versionRoute } from '@server/routes/version.js';
import { configFilesRoute } from '@server/routes/config-files';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function startExpressServer() {
    const app = express();
    const port = 3333;

    const publicDir = resolve(__dirname, '../public');
    app.use(express.static(publicDir));

    versionRoute(app);
    configFilesRoute(app);

    app.listen(port, () => {
        console.log(`Simple-Build Listening on port ${port}`);
    });
}
