export interface IEntry {
    entryPoints: string[];
    outDir?: string;
    outFile?: string;
    cleanPatterns?: string[];
    tsconfigPath?: string;
}
