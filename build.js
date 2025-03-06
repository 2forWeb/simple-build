import * as esbuild from 'esbuild';
import process from 'node:process';

const isWatch = process.argv.includes('--watch');

const buildOptions = {
    entryPoints: ['src/index.ts'],
    outfile: './dist/index.js',
    platform: 'node',
    format: 'esm',
    bundle: true,
    external: ['esbuild'],
};

if (isWatch) {
    const ctx = await esbuild.context(buildOptions);

    await ctx.watch();
    console.log('watching...');
} else {
    await esbuild.build(buildOptions);
}
