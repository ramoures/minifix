import CleanCSS from 'clean-css';
import { minify as minifyHTML } from 'html-minifier-terser';
import { minify as minifyJS } from 'terser';

export const minifyContent = async (code, fileType, minifyOptions) => {
    switch (fileType) {
        case 'mjs':
        case 'js':
            return (await minifyJS(code, minifyOptions?.js ?? {})).code;
        case 'css':
            return new CleanCSS(minifyOptions?.css ?? {}).minify(code).styles;
        case 'htm':
        case 'html':
            return minifyHTML(code, minifyOptions?.html ?? {});
        default:
            throw new Error(`Unsupported file type: ${fileType}`);
    }
};