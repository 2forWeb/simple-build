import type { Application } from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const versionRoute = (app: Application) => {
    app.get('/api/version', (_req, res) => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const packageFile = readFileSync(resolve(__dirname, '../package.json'), 'utf-8');
        const packageJson = JSON.parse(packageFile);
        const version = packageJson.version || '1.0.0';

        res.json({ version, packageFile });
    });
};
