export const bgMagenta = (string) => {
    return `\x1b[97;45m${string}\x1b[0m`;
}

export const bgBlue = (string) => {
    return `\x1b[97;44m${string}\x1b[0m`;
}

export const textYellow = (string) => {
    return `\x1b[33m${string}\x1b[0m`;
}

export const textMagenta = (string) => {
    return `\x1b[35m${string}\x1b[0m`;
}

export const textBlue = (string) => {
    return `\x1b[94m${string}\x1b[0m`;
}

export const textRed = (string) => {
    return `\x1b[31m${string}\x1b[0m`;
}

export const textGreen = (string) => {
    return `\x1b[32m${string}\x1b[0m`;
}