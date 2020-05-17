module.exports = function (config) {
  config.set({
    mutator: "typescript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress", "dashboard"],
    testRunner: "mocha",
    transpilers: ["typescript"],
    testFramework: "mocha",
    coverageAnalysis: "perTest",
    tsconfigFile: "tsconfig-stryker.json",
    files: ["src/**/*.ts", "tests/**/*.ts"],
    mutate: ["src/**/*.ts"],
    mochaOptions: {
      spec: ['tests/**/*.js']
    },
    htmlReporter: {
      baseDir: 'testReport/mutation/html'
    }
  });
};
