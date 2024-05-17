/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  coverageDirectory: '<rootDir>/coverage',
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/build'],
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts'],
  verbose: true,
  forceExit: false,
};
