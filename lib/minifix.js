/**
 * ### minifix
 * A lightweight JS, CSS, and HTML minifier with live watching support
 * @source https://github.com/ramoures/minifix
 * @copyright 2025 Under MIT License.
 * JS Minifying powered by Terser
 * CSS Minifying powered by clean-css
 * HTML Minifying powered by html-minifier-terser
 */

import { readFileSync, writeFileSync, watch, existsSync } from 'fs';
import { resolve, basename } from 'path';
import { minifyContent } from './handler.js';
import { bgBlue, bgMagenta, textBlue, textMagenta, textRed } from './ANSI.js';
import { debounce, ensureDirectoryExistence, getElapsedTime } from './utils.js';

let inputFile = [];
let outputFile = [];
let minifyOptions = {};

export const setConfigs = (configs) => {
    minifyOptions = configs.minifyOptions ?? {};
    configs?.inputs.forEach((element, i) => {
        inputFile[inputFile.length] = resolve(process.cwd(), element);
        const inputPath = configs?.inputs[i] ?? '';
        const inputParts = inputPath.split('.');
        const outputPath = configs?.outputs?.[i]
            ? resolve(process.cwd(), configs.outputs[i])
            : inputParts.length > 1
                ? `${inputParts.slice(0, -1).join('.')}_output_.${inputParts.at(-1)}`
                : `${inputPath}_output`;
        outputFile[outputFile.length] = resolve(process.cwd(), outputPath);
    });
}

export const minifyFile = async (filename = '') => {
    for (const [index, value] of inputFile.entries()) {
        if (!existsSync(value)) continue;

        if (filename) {
            if (filename !== basename(value))
                continue;
            else
                console.log(`\n${textMagenta('File')} ${bgMagenta(filename)} ${textMagenta('has been changed.')}`);
        }

        const startTime = process.hrtime();
        try {
            const code = readFileSync(value, 'utf8');
            const fileType = basename(value).split('.').pop();
            const minifiedCode = await minifyContent(code, fileType, minifyOptions);
            ensureDirectoryExistence(outputFile[index]);
            writeFileSync(outputFile[index], minifiedCode);
            console.log(`File minified and saved to ${bgBlue(basename(outputFile[index]))}`);
        } catch (err) {
            console.error('Error minifying file:', err);
        }
        console.log(`- Minifying ${textBlue(basename(value))} done in ${bgBlue(getElapsedTime(startTime))}\n`);
    };
}

const debouncedMinifyFile = debounce(minifyFile, 100);

export const watchFile = () => {
    console.log(`Watching for changes in:`);
    const validInputs = inputFile.filter(path => path.trim() !== "");
    if (!validInputs.length) {
        console.log(textRed('\nError: No valid input files provided.\n'));
        process.exit(0);
    }
    let missingFiles = [];
    for (const [index, value] of validInputs.entries()) {
        if (!existsSync(value)) {
            missingFiles.push(value);
            continue;
        }
        try {
            watch(value, (eventType, filename) => {
                if (eventType === 'change' && filename) {
                    debouncedMinifyFile(filename);
                }
            });
            console.log(`${index + 1 + `. ` + textBlue(basename(value))}`);
        } catch (err) {
            console.error('Error watching file:', err);
        }
    };

    if (missingFiles.length) {
        console.log(`\n${textRed('Warning: The following files do not exist:')}`);
        missingFiles.forEach((file, i) => { console.log(`${textRed(i + 1 + '. ' + file)}`) });
    };

    console.log('');
}
