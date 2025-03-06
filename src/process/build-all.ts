import { getBuildTasks } from '../util/get-build-tasks';
import { IConfig } from '../types/config';

export async function buildAll(config: IConfig) {
    const tasks = getBuildTasks(config);

    await Promise.all(tasks.map((task) => task.RunTask()));
}
