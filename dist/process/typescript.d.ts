import BuildTask from './build-task';
import { IEntry } from '../types/entry';
export default class extends BuildTask {
    tsconfigPath: string;
    Configure(entry: IEntry): void;
    Execute(): Promise<void>;
}
