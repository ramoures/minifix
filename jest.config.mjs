export default {
    testEnvironment: 'node',
    testMatch: ['<rootDir>/tests/*.test.mjs'],
    transform: {
        '^.+\\.mjs$': 'babel-jest',
    },
};