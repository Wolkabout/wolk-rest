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
  "verbose": true,
  "collectCoverage": true
}
