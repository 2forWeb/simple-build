import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function startExpressServer() {
    const app = express();
    const port = 3333;

    const publicDir = resolve(__dirname, '../public');
    app.use(express.static(publicDir));

    // app.get('/', (_req: express.Request, res: express.Response) => {
    //     res.sendFile(publicDir + '/index.html');
    // });

    app.listen(port, () => {
        console.log(`Simple-Build Listening on port ${port}`);
    });
}
