import { buildAll } from './process/build-all';
import { watch } from 'fs/promises';
import { isWatching } from './util/is-watching';
import { IConfig } from './types/config';
import { color, bold } from './util/colors';
import { getConfig } from './util/get-config';

async function build(config: IConfig) {
    await buildAll(config);

    if (isWatching()) {
        let timeout: NodeJS.Timeout | number | null = null;
        const watcher = watch(config.clientRoot, { recursive: true });

        console.log(bold(color('yellow', '--- Watching for changes ---')) + '\n');

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const _event of watcher) {
            if (timeout !== null) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(async () => {
                console.clear();
                console.log(bold(color('yellow', '--- Rebuilding... ---')) + '\n\n');

                await buildAll(config);

                console.log(bold(color('yellow', '--- Watching for changes ---')) + '\n');
            }, 500);
        }
    }
}

await build(await getConfig());
