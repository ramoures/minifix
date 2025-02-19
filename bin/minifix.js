#!/usr/bin/env node
import { resolve } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { setConfigs, minifyFile, watchFile } from '../lib/minifix';
import { textGreen, textRed, textYellow } from '../lib/ANSI';

const configPath = resolve(process.cwd(), 'minifix.config.js');

if (!existsSync(configPath)) {
    console.log(`${textYellow('Creating default minifix.config.js...')}`);
    const defaultConfig = `export default {
    inputs: [],
    outputs: [],
    minifyOptions: {
        css: {},
        js: {},
        html: {}
    }
};`;
    writeFileSync(configPath, defaultConfig);
    console.log(`${textGreen('Configuration file created: minifix.config.js')}`);
}

import(configPath).then(module => {
    const configs = module.default ?? module;
    if (!configs || !configs.inputs || !configs.outputs || !configs.minifyOptions) {
        throw new Error(`${textRed('Invalid configuration.')}`);
    }
    setConfigs(configs);
    console.log('** Running minifix **\n');
    minifyFile();
    watchFile();
}).catch(err => {
    console.error(`${textRed('Failed to load configuration:')}`, err);
});
