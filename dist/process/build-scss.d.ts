import BuildTask from './build-task';
import { IEntry } from '../types/entry';
export default class extends BuildTask {
    Configure(entry: IEntry): void;
}
