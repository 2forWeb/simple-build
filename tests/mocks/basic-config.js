import { BuildTask } from '../../dist';
import * as path from 'path';

export default {
    clientRoot: path.resolve(__dirname, './client'),
    assetRoot: path.resolve(__dirname, './dist'),
    buildTasks: [
        {
            name: 'Test building a typescript file',
            task: BuildTask,
            entry: {
                entryPoints: ['./index.ts'],
                outFile: './index.js',
            },
        },
    ],
};
