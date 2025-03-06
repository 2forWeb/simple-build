import { describe, it, expect } from '@jest/globals';
import BasicConfig from './mocks/basic-config';
import { build } from '../dist';
import { readFileSync } from 'node:fs';
import path from 'path';

describe('Basic build test', () => {
    it('Should work', async () => {
        await build(BasicConfig);

        const builtFile = readFileSync(path.resolve(__dirname, './mocks/dist/index.js'), 'utf8');

        expect(builtFile).toEqual('(()=>{console.log("Hello, world!");})();\n');
    });
});
