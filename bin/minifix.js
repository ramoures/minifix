#!/usr/bin/env node
import { resolve } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { setConfigs, minifyFile, watchFile } from '../lib/minifix.js';
import { textBlue, textGreen, textRed, textYellow } from '../lib/ANSI.js';

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
};

/**
 * CSS Options: https://github.com/clean-css/clean-css#constructor-options
 * JS Options: https://terser.org/docs/options/
 * HTML Options: https://github.com/terser/html-minifier-terser#options-quick-reference
 */`;
    writeFileSync(configPath, defaultConfig);
    console.log(`${textGreen('Configuration file created: minifix.config.js')}`);
    console.log(`Now you can customize your settings in minifix.config.js and run the ${textBlue('minifix')} again.\n`);
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
