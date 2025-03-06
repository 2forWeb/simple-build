import { IConfig } from '../types/config';

export function getBuildTasks(config: IConfig) {
    return config.buildTasks.map(
        (buildTask) => new buildTask.task(buildTask.name, config.clientRoot, config.assetRoot, buildTask.entry)
    );
}
