module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx)",
    "**/?(*.)+(spec|test).+(ts|tsx)",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  coveragePathIgnorePatterns: [
    "node_modules"
  ],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    '^axios$': require.resolve('axios'),
  }
};
