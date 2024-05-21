/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: ['<rootDir>/src/migrations', '<rootDir>/src/utils/config.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/build'],
  coveragePathIgnorePatterns: ['<rootDir>/src/migrations'],
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts'],
  verbose: true,
  forceExit: false,
};
