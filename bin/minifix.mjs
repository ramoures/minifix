#!/usr/bin/env node
import { resolve } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { setConfigs, minifyFile, watchFile } from '../lib/minifix.mjs';
import { textBlue, textGreen, textRed, textYellow } from '../lib/ANSI.mjs';
import { pathToFileURL } from 'url';

const configPath = resolve(process.cwd(), 'minifix.config.mjs');

if (!existsSync(configPath)) {
    console.log(`${textYellow('Creating default minifix.config.mjs...')}`);
    const defaultConfig = `export default {
    inputs: [],
    outputs: [],
    minifyOptions: {
        css: {},
        js: {},
        html: {
            collapseWhitespace: true,
        }
    }
};

/**
 * CSS Options: https://github.com/clean-css/clean-css#constructor-options
 * JS Options: https://terser.org/docs/options/
 * HTML Options: https://github.com/terser/html-minifier-terser#options-quick-reference
 */`;
    writeFileSync(configPath, defaultConfig);
    console.log(`${textGreen('Configuration file created: minifix.config.mjs')}`);
    console.log(`Now you can customize your settings in ${textYellow('minifix.config.mjs')} and run the ${textBlue('npx minifix')} again.\n`);
    process.exit(0);
}
const configPathUlr = pathToFileURL(configPath);
import(configPathUlr?.href).then(module => {
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
