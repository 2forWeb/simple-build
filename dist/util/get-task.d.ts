import BuildTask from '../process/build-task';
import BuildScss from '../process/build-scss';
import CopyFiles from '../process/copy-files';
import TypeScript from '../process/typescript';
import { TaskName } from '../types/config';
type TaskClass = typeof BuildTask | typeof BuildScss | typeof CopyFiles | typeof TypeScript;
export declare function getTask(task: TaskName): TaskClass;
export {};
