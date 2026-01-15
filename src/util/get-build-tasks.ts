import type { IConfig, TaskName } from '@interfaces/config';
import { getTask } from './get-task';

export function getBuildTasks(config: IConfig) {
    return config.buildTasks.map((buildTask) => {
        const TaskClass = getTask(buildTask.task as TaskName);

        if (!TaskClass) {
            throw new Error(`Unknown build task: ${buildTask.task}`);
        }

        return new TaskClass(buildTask.name, config.clientRoot, config.assetRoot, buildTask.entry);
    });
}
