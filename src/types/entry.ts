import * as esbuild from 'esbuild';

export interface IEntry {
    entryPoints: string[];
    outDir?: string;
    outFile?: string;
    cleanPatterns?: string[];
    plugins?: esbuild.Plugin[];
    tsconfigPath?: string;
}
