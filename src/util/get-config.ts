import type { IConfig } from '@interfaces/config';
import { resolve } from 'path';
import { existsSync } from 'fs';

export async function getConfig(): Promise<IConfig> {
    const configFileNames = ['simple-build.config.js', 'simple-build.config.cjs', 'simple-build.config.mjs'];

    const curDir = process.cwd();

    for (let i = 0; i < configFileNames.length; i++) {
        const configFilePath = resolve(curDir, configFileNames[i]);
        if (existsSync(configFilePath)) {
            const configModule = await import(configFilePath);
            return configModule.default || configModule;
        }
    }

    return {
        clientRoot: resolve(curDir, './client'),
        assetRoot: resolve(curDir + './assets'),
        buildTasks: [],
    };
}
