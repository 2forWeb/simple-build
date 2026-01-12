export default {
    clientRoot: './client',
    assetRoot: './dist',
    buildTasks: [
        {
            name: 'Test building a typescript file',
            task: 'build',
            entry: {
                entryPoints: ['./index.ts'],
                outFile: './index.js',
            },
        },
    ],
};
