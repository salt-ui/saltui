module.exports = {
  setupFiles: [
    './test/setup.js',
  ],
  verbose: true,
  testURL: 'http://localhost/',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
  testEnvironment: 'jsdom',
  reporters: [
    'default',
    'jest-spec-reporter',
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/dist/',
    '/node_modules/',
  ],
};
