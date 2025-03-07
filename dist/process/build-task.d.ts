import { IEntry } from '../types/entry';
import * as esbuild from 'esbuild';
export default class BuildTask {
    protected taskName: string;
    protected clientRoot: string;
    protected assetRoot: string;
    protected entry: IEntry;
    protected options: esbuild.BuildOptions | null;
    constructor(taskName: string, clientRoot: string, assetRoot: string, entry: IEntry);
    GetTaskName(): string;
    RunTask(): Promise<void>;
    Execute(): Promise<void>;
    Configure(entry: IEntry): void;
    PrintTaskName(): void;
    PrintDone(): void;
    PrintError(): void;
    getMinifyAndSourMapOptions(): {
        minify: boolean;
        sourcemap: boolean;
    };
    ResolveEntryPoints(entries?: string[]): Partial<esbuild.BuildOptions> | undefined;
    ResolveOutDir(outDir?: string): Partial<esbuild.BuildOptions> | undefined;
    ResolveOutFile(outFile?: string): Partial<esbuild.BuildOptions> | undefined;
    AddPlugins(plugins?: esbuild.Plugin[], cleanPatterns?: string[]): Partial<esbuild.BuildOptions> | undefined;
    GetBundle(): boolean;
}
