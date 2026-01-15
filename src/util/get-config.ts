import { resolve } from 'path';
import { existsSync } from 'fs';
import type { IConfig } from '@interfaces/config';
import { getConfigFileNames } from '@util/get-config-file-names';

export async function getConfig(): Promise<IConfig> {
    const configFileNames = getConfigFileNames();

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
