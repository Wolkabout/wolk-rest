module.exports = {
  "globals": {
    "ts-test": {
      "tsConfigFile": "<rootDir>/tsconfig.test.json"
    }
  },
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/tests/.*|(\\.|/)(spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],

  // Coverage Report
  // https://github.com/facebook/jest/blob/master/docs/Configuration.md#coveragereporters-array
  // "collectCoverage": true,
  // "coverageDirectory": "<rootDir>/coverage",
  // "coverageReporters": ["html"]
}
