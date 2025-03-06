import { color } from 'console-log-colors';
import { IEntry } from '../types/entry';
import * as esbuild from 'esbuild';
import { isDev } from '../util/is-dev';
import path from 'path';
import { clean } from 'esbuild-plugin-clean';

export default class BuildTask {
    protected options: esbuild.BuildOptions | null = null;

    constructor(
        protected taskName: string,
        protected clientRoot: string,
        protected assetRoot: string,
        protected entry: IEntry
    ) {
        this.Configure(entry);
    }

    GetTaskName(): string {
        return this.taskName;
    }

    async RunTask(): Promise<void> {
        this.PrintTaskName();

        try {
            await this.Execute();

            this.PrintDone();
        } catch (error) {
            console.log(error);
            this.PrintError();
        }
    }

    async Execute(): Promise<void> {
        if (this.options === null) {
            throw new Error('No options specified');
        }

        await esbuild.build(this.options);
    }

    Configure(entry: IEntry): void {
        this.options = {
            bundle: this.GetBundle(),
            ...this.ResolveEntryPoints(entry.entryPoints),
            ...this.getMinifyAndSourMapOptions(),
            ...this.ResolveOutDir(entry.outDir),
            ...this.ResolveOutFile(entry.outFile),
            ...this.AddPlugins(entry.plugins, entry.cleanPatterns),
        };
    }

    PrintTaskName(): void {
        console.log(color.grey('[  ]') + ' ' + color.green(`Running Task: ${this.GetTaskName()}...\n`));
    }

    PrintDone(): void {
        console.log(
            '\n' + color.bold(color.grey('[✔️]') + ' ' + color.green(`${this.GetTaskName()} finished successfully...\n`))
        );
    }

    PrintError(): void {
        console.log('\n' + color.bold(color.grey('[❌]') + ' ' + color.red(`${this.GetTaskName()} finished with an error!\n`)));
    }

    getMinifyAndSourMapOptions(): { minify: boolean; sourcemap: boolean } {
        return {
            minify: !isDev(),
            sourcemap: isDev(),
        };
    }

    ResolveEntryPoints(entries?: string[]): Partial<esbuild.BuildOptions> | undefined {
        return entries ? { entryPoints: entries.map((entry) => path.resolve(this.clientRoot, entry)) } : undefined;
    }

    ResolveOutDir(outDir?: string): Partial<esbuild.BuildOptions> | undefined {
        return outDir ? { outdir: path.resolve(this.assetRoot, outDir) } : undefined;
    }

    ResolveOutFile(outFile?: string): Partial<esbuild.BuildOptions> | undefined {
        return outFile ? { outfile: path.resolve(this.assetRoot, outFile) } : undefined;
    }

    AddPlugins(plugins?: esbuild.Plugin[], cleanPatterns?: string[]): Partial<esbuild.BuildOptions> | undefined {
        return cleanPatterns
            ? {
                  plugins: [
                      ...(plugins || []),
                      clean({ patterns: cleanPatterns.map((pattern) => path.resolve(this.assetRoot, pattern)) }),
                  ],
              }
            : undefined;
    }

    GetBundle() {
        return !!this.entry.outFile;
    }
}
