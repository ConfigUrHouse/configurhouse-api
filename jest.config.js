module.exports = {
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/jest/setEnvVars.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  reporters: ['default', 'jest-sonar'],
  coverageDirectory: '<rootDir>/jest',
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
};
