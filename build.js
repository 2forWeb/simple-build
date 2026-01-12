import * as esbuild from 'esbuild';
import process from 'node:process';

const isWatch = process.argv.includes('--watch');

const buildOptions = {
    entryPoints: ['src/index.ts'],
    outfile: './dist/index.mjs',
    platform: 'node',
    format: 'esm',
    bundle: true,
    external: ['esbuild', 'dotenv', 'esbuild-copy-files-plugin', 'esbuild-plugin-clean', 'esbuild-sass-plugin'],
    plugins: [
        {
            'name': 'add shebang',
            setup: (build) => {
                build.onEnd(async (result) => {
                    if (result.errors.length === 0) {
                        const fs = await import('fs/promises');
                        const path = './dist/index.mjs';
                        const data = await fs.readFile(path, 'utf8');
                        if (!data.startsWith('#!')) {
                            await fs.writeFile(path, '#!/usr/bin/env node\n' + data, 'utf8');
                        }
                    }
                });
            },
        },
    ],
};

if (isWatch) {
    const ctx = await esbuild.context(buildOptions);

    await ctx.watch();
    console.log('watching...');
} else {
    await esbuild.build(buildOptions);
}
