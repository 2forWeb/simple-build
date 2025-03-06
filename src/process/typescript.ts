import BuildTask from './build-task';
import path from 'path';
import { IEntry } from '../types/entry';
import { exec } from 'node:child_process';

export default class extends BuildTask {
    declare tsconfigPath: string;

    override Configure(entry: IEntry): void {
        if (entry.tsconfigPath === undefined) {
            throw new Error('Missing tsconfig path for task.');
        }

        this.tsconfigPath = path.resolve(this.clientRoot, entry.tsconfigPath);
    }

    override Execute(): Promise<void> {
        const path = this.tsconfigPath;

        return new Promise((resolve, reject) => {
            exec(`./node_modules/.bin/tsc --project ${path}`, (error, stdout, stderr) => {
                console.log(stdout);

                if (error === null) {
                    resolve();
                }

                console.log(stderr);
                reject(error);
            });
        });
    }
}
