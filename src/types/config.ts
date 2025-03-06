import { IEntry } from './entry';
import BuildTask from '../process/build-task';

export interface IBuildTask {
    name: string;
    task: typeof BuildTask;
    entry: IEntry;
}

export interface IConfig {
    clientRoot: string;
    assetRoot: string;
    buildTasks: IBuildTask[];
}
