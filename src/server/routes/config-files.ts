import type { Application } from 'express';
import { promises as fs } from 'fs';
import { resolve, relative } from 'path';
import type { ConfigFilesResponse, ConfigFileResponseItem } from '@interfaces/api';
import { getConfigFileNames } from '@util/get-config-file-names';

const configFileNames = getConfigFileNames();

/**
 * Recursively walks a directory and returns absolute paths
 * of all matching config files.
 */
async function findConfigFiles(dir: string, results: string[] = []): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = resolve(dir, entry.name);

        if (entry.isDirectory()) {
            if (['node_modules', '.git', '.cache', 'var', 'cache', 'public'].includes(entry.name)) continue;
            await findConfigFiles(fullPath, results);
        } else if (entry.isFile() && configFileNames.includes(entry.name)) {
            results.push(fullPath);
        }
    }

    return results;
}

export const configFilesRoute = (app: Application) => {
    app.get('/api/config-files', async (_req, res) => {
        try {
            const root = process.cwd();
            const foundFiles = await findConfigFiles(root);

            const files: ConfigFileResponseItem[] = [];

            for (const absPath of foundFiles) {
                const content = await fs.readFile(absPath, 'utf-8');
                const relPath = '/' + relative(root, absPath);
                files.push({ filePath: relPath, fileContents: content });
            }

            const response: ConfigFilesResponse = { files };
            res.json(response);
        } catch (err) {
            console.error('Error scanning config files:', err);
            res.status(500).json({ error: 'Failed to scan config files' });
        }
    });
};
