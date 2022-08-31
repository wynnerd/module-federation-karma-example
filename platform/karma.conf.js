// eslint-disable-next-line @typescript-eslint/no-var-requires
process.env.CHROME_BIN = require('puppeteer').executablePath();

const plugins = ['karma-webpack', 'karma-mocha', 'karma-chrome-launcher', 'karma-sourcemap-loader'];

const tsUseRules = ['ts-loader'];

const reporters = ['progress'];

if (process.env.npm_lifecycle_script.includes('--single-run')) {
  tsUseRules.unshift('@jsdevtools/coverage-istanbul-loader');
  plugins.push('karma-coverage-istanbul-reporter');
  reporters.push('coverage-istanbul');
}

module.exports = (config) => {
  config.set({
    frameworks: ['mocha', 'webpack'],

    reporters,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    plugins,

    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
    },

    combineBrowserReports: true,

    // if using webpack and pre-loaders, work around webpack breaking the source path
    fixWebpackSourcePaths: true,

    files: [
      // all files ending in ".test.js"
      // !!! use watched: false as we use webpacks watch
      { pattern: 'test/**/*.test.js', watched: false },
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/**/*.test.js': ['webpack'],
    },

    webpack: require('./webpack.config')
  });
};


