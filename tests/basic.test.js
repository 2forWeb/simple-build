import { describe, it, expect } from 'vitest';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'path';

describe('Basic build test', () => {
    it('Should work', async () => {
        execSync('cd tests/mocks && rm ./dist/index.js || true');
        execSync('cd tests/mocks && ../../dist/index.mjs');
        const builtFile = readFileSync(path.resolve(__dirname, './mocks/dist/index.js'), 'utf8');

        expect(builtFile).toEqual('(()=>{console.log("Hello, world!");})();\n');
    });
});
