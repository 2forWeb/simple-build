import BuildTask from './build-task';
import copy from 'esbuild-copy-files-plugin';
import path from 'path';
import { IEntry } from '../types/entry';

export default class extends BuildTask {
    override Configure(entry: IEntry): void {
        if (entry.outDir === undefined) {
            throw new Error('outDir must be provided to copy files plugin');
        }

        this.options = {
            plugins: [
                copy({
                    source: entry.entryPoints.map((file) => path.resolve(this.clientRoot, file)),
                    target: path.resolve(this.assetRoot, entry.outDir),
                    copyWithFolder: false,
                }),
            ],
        };
    }
}
