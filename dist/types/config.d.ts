import { IEntry } from './entry';
export type TaskName = 'build' | 'scss' | 'copy-files' | 'typescript';
export interface IBuildTask {
    name: TaskName;
    task: string;
    entry: IEntry;
}
export interface IConfig {
    clientRoot: string;
    assetRoot: string;
    buildTasks: IBuildTask[];
}
