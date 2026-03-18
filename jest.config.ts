/** @jest-config-loader ts-node */

import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: -10,
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  moduleDirectories: ['node_modules', 'src'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/dto/**',
    '!**/test/**',
    '!**/*.module.ts',
    '!**/coverage/**',
    '!**/config/**',
    '!**/prisma.service.ts',
    '!**/main.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
    '@common/(.*)': '<rootDir>/src/common/$1',
  },
};

export default config;
