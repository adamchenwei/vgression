/* eslint-disable */

/// REGEX to capture the file url for the snapshot
//    /\bdetails:.*?(\/.*?\.png\b)/
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const image2base64 = require('image-to-base64');
const lodash = require('lodash');
const _values = lodash.values;
const glob = require('glob');
class SnapshotDiffReporter {
  constructor(jestResults, globalConfig, options) {
    this._results = jestResults;
    this._globalConfig = globalConfig;
    this._options = options;
    this.hasFailedTests = false;
    this.snapshotsDictionary = {
      // 'test-name': {
      //   diff: {
      //     imageUrl: '',
      //     base64: ''
      //   },
      // }
    }
  }
  getTestName(fileName) {
    return fileName.replace('-snap.png', '');
  }
  setResults(results) {
    this._results = results;
  }
  formatDisplayTestName(fileName) {
    const noPathName = fileName.substring(fileName.lastIndexOf("/") + 1);
    // console.log(chalk.green(noPathName))
    const noExtName = noPathName.substring(0, noPathName.lastIndexOf("."));
    // console.log(chalk.yellow(noExtName))
    return noExtName;
    // return noExtName.split('-').join(' ');
  }
  // NOTE: function for jest itself to execute reporter generation
  generate(test, testResult, aggregateResults) {
    console.log('generate', chalk.grey.bgWhite('generate ...'));
    // console.log('this._results', chalk.grey.bgWhite(JSON.stringify(this._results)));
    glob("./src/**/*-diff.png", {}, (er, filesList) => {
      // console.log(chalk.magenta(filesList))
      // console.log(filesList);
      // console.log(chalk.red(filesList))
      const totalSnapshots = filesList.length;
      // const totalImagesCount = totalSnapshots * 2;
      // console.log(chalk.yellow(totalSnapshots))
      // console.log(chalk.magenta(filesList || 'empty file list, whaaat'))
      const list = this._results.testResults.map((result) => {
        return result.testFilePath;
      });
      console.log('generated results list', chalk.yellow(list))
      this.loopSnapshots(filesList, totalSnapshots)
    });
  }
  loopSnapshots(list =[], totalImagesCount) {
    // console.log('loopSnapshots...')
    // console.log('list', chalk.green(list));
    // console.log('this._results', chalk.green(this._results));

    let generatorCount = 0;
    if (!list.length) {
      console.log(chalk.yellow(`No new report generated.`));
      if (this._results && !this._results.numFailedTestSuites && !this._results.numFailedTests) {
        console.log(chalk.green(`Congradulations! No Failed Visual Regression Tests! Report File Updated.`));
        this.createReport();
      }
    } else {
      if (this._results.numFailedTestSuites || this._results.numFailedTests) {
        this.hasFailedTests = true;
      }
      list.forEach(file => {
        // console.log(chalk.green(file));
        const fileName = this.getTestName(file);
        // const diffFilePath = `${IMAGES_DIFF_DIR}${fileName}-diff.png`;
        this.snapshotsDictionary[fileName] = {
          name: fileName,
          diff: {
            imageUrl: file,
            base64: '',
          }
        };
  
        image2base64(file) // you can also to use url
        .then(
            (encodedImageSrcString) => {
              // console.log('image2base64', fileName)
              // console.log(chalk.yellow(encodedImageSrcString))
              // console.log(encodedImageSrcString); //cGF0aC90by9maWxlLmpwZw==
              this.snapshotsDictionary[fileName].diff.base64 = encodedImageSrcString;
              console.log(chalk.green(`${fileName} generated successfully...`));
              generatorCount ++;
              this.showFinalRecords(generatorCount >= totalImagesCount);
            }
        )
        .catch(
            (error) => {
              console.log(chalk.red.bold(error));
              generatorCount ++;
              this.showFinalRecords(generatorCount >= totalImagesCount);
            }
        )
      })
    }

  }
  createReport(list = []) {
    const head = `
      <!DOCTYPE html>
        <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
        <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
        <!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
        <!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>Snapshot Diff Report</title>
          <meta name="description" content="">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="">
        </head>
    `;
    const bodyNoDiff = `
        <body style="
          display: flex;
          flex-direction: column;
          width: 100%;
        ">
          <h1>Congrads! No Diffs!</h1>
        </body>
    `;

    const bodyWithDiff = `
        <body style="
          display: flex;
          flex-direction: column;
          width: 100%;
        ">
          ${list.map(snapshot => {

            return `
              <div>

                <div style="
                  display: flex;

                  flex-direction: column;
                  width: 100%;
                ">
                  <div style="width: 100%"><p>${this.formatDisplayTestName(snapshot.name)}</p></div>

                  <div style="flex:1">
                    <img style="width: 100%" src="data:image/png;base64,${snapshot.diff.base64}" />
                    </div>
                </div>
              </div>
            `
          })}
        </body>
    `;
    const foot = `
      </html>
    `;
    fs.writeFile('reporter.html',`
          ${head}
          ${this.hasFailedTests ? bodyWithDiff : bodyNoDiff}
          ${foot}

      `, error=> chalk.red.bold(error))
  }
  showFinalRecords(shouldShow) {
    if(shouldShow) {
      const list = _values(this.snapshotsDictionary);
      // console.log(chalk.red(list));
      this.createReport(list);
      console.log(chalk.red.bold(`Image Diff Report Re-Generated!`));
    }

  }
}

module.exports = SnapshotDiffReporter;