import BuildTask from '../process/build-task';
import BuildScss from '../process/build-scss';
import CopyFiles from '../process/copy-files';
import TypeScript from '../process/typescript';
import { TaskName } from '../types/config';

type TaskClass = typeof BuildTask | typeof BuildScss | typeof CopyFiles | typeof TypeScript;

const tasks: Record<TaskName, TaskClass> = {
    build: BuildTask,
    scss: BuildScss,
    'copy-files': CopyFiles,
    typescript: TypeScript,
};

export function getTask(task: TaskName): TaskClass {
    return tasks[task];
}
