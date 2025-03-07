import BuildTask from './build-task';
import path from 'path';
import { IEntry } from '../types/entry';
import { exec } from 'node:child_process';
import * as esbuild from 'esbuild';

export default class extends BuildTask {
    declare tsconfigPath: string;

    override Configure(entry: IEntry): void {
        if (entry.tsconfigPath === undefined) {
            throw new Error('Missing tsconfig path for task.');
        }

        this.tsconfigPath = path.resolve(this.clientRoot, entry.tsconfigPath);

        this.options = {
            ...this.AddPlugins(entry.plugins, entry.cleanPatterns),
        };
    }

    override async Execute(): Promise<void> {
        const path = this.tsconfigPath;

        // for the clean plugin
        if (this.options?.plugins?.length) {
            await esbuild.build(this.options);
        }

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
