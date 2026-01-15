import { getBuildTasks } from '@util/get-build-tasks';
import type { IConfig } from '@interfaces/config';

export async function buildAll(config: IConfig) {
    const tasks = getBuildTasks(config);

    await Promise.all(tasks.map((task) => task.RunTask()));
}
