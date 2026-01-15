import { sassPlugin } from 'esbuild-sass-plugin';
import BuildTask from './build-task';
import type { IEntry } from '@interfaces/entry';

export default class extends BuildTask {
    override Configure(entry: IEntry): void {
        super.Configure(entry);

        if (this.options === null) {
            throw new Error('Error: Options must be set!');
        }

        this.options.loader = {
            '.eot': 'file',
            '.ttf': 'file',
            '.png': 'file',
            '.jpg': 'file',
            '.webp': 'file',
            '.woff': 'file',
            '.woff2': 'file',
            '.svg': 'file',
        };

        this.options.assetNames = '[dir]/[name]';

        this.options.plugins?.push(sassPlugin());
    }
}
