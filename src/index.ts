import { buildAll } from './process/build-all';
import { watch } from 'fs/promises';
import { isWatching } from './util/is-watching';
import { IConfig } from './types/config';
import BuildTask from './process/build-task';
import BuildScss from './process/build-scss';
import CopyFiles from './process/copy-files';
import BuildTypeScript from './process/typescript';
import { color, bold } from './util/colors';

async function build(config: IConfig) {
    await buildAll(config);

    if (isWatching()) {
        let timeout: NodeJS.Timeout | null = null;
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

export { build, BuildTask, BuildScss, CopyFiles, BuildTypeScript };
