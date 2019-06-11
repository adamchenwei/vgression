/* eslint-disable */

/*
 * To enable this image reporter, add it to your `jest.config.js` "reporters" definition:
    "reporters": [ "default", "<rootDir>/image-reporter.js" ]
 */

const chalk = require('chalk');
const SnapshotDiffReporter = require('./snapshot-diff-reporter.js');

// console.log('-------VVVV image reporter');
// console.log('env: ', process.env);
// console.log('-------^^^^ image reporter');

class ImageReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
    this.report = new SnapshotDiffReporter();
  }

  onRunComplete(contexts, results) {
    // console.log(chalk.cyan('-------onRunComplete'))
    // console.log('onRunComplete contexts', chalk.grey(JSON.stringify(contexts)));
    // console.log('onRunComplete result', chalk.red(JSON.stringify(results)));


    // console.log('Custom reporter output:');
    // console.log('GlobalConfig: ', this._globalConfig);
    // console.log('Options: ', this._options);
    // const report = new SnapshotDiffReporter(results);
    this.report.setResults(results);
    this.report.generate();
    chalk.magenta.bold(`Image Diff Report Generated! 1`);
    // console.log('onRunComplete', chalk.gray.bgYellow(JSON.stringify(results)));
  }

  // onTestResult(a, b, c) {
  //   console.log(chalk.blue.bgWhite('-------onTestResult'))
  //   console.log('onTestResult a', chalk.grey(JSON.stringify(a)));
  //   // console.log('onTestResult b', chalk.grey(JSON.stringify(b)));
  //   // console.log('onTestResult c', chalk.grey(JSON.stringify(c)));
  // }

  // onTestResult(test, testResult, aggregateResults) {

  //   if (testResult &&
  //     testResult.numFailingTests &&
  //     testResult.failureMessage.match(/different from snapshot/)
  //   ) {
  //     // reporter = new SnapshotDiffReporter();
  //     this.reporter.generate(test, testResult, aggregateResults);
  //     chalk.red.bold(`Image Diff Report Generated! 2`)
  //   };
  // }
}

module.exports = ImageReporter;

// const reporter = new ImageReporter();
// reporter.onTestResult();
