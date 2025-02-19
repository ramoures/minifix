import { existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export const getElapsedTime = (startTime) => {
    const elapsed = process.hrtime(startTime);
    const elapsedMs = elapsed[0] * 1000 + elapsed[1] / 1e6;
    return `${elapsedMs.toFixed(2)}ms`;
}

export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

export const ensureDirectoryExistence = (filePath) => {
    const dir = dirname(filePath);
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
};