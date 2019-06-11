// /* eslint-disable */

// /*
//  * To enable this image reporter, add it to your `jest.config.js` "reporters" definition:
//     "reporters": [ "default", "<rootDir>/image-reporter.js" ]
//  */

// const chalk = require('chalk');
// const fs = require('fs');
// const image2base64 = require('image-to-base64');
// const UPLOAD_BUCKET = 'sfw-pixel-snapshots';

// const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// console.log('-------VVVV image reporter');
// console.log('env: ', process.env);
// console.log('-------^^^^ image reporter');

// class ImageReporter {
//   constructor(globalConfig, options) {
//     this._globalConfig = globalConfig;
//     this._options = options;
//   }

//   onTestResult(test, testResult, aggregateResults) {
//     // if (
//     //   testResult.numFailingTests &&
//     //   testResult.failureMessage.match(/different from snapshot/)
//     // ) {
//       const files = fs.readdirSync(
//         './__tests__/__image_snapshots__/'
//       );

//       console.log(files);
//       files.forEach(file => {
//         image2base64(file) // you can also to use url
//           .then(
//               (encodedImageSrcString) => {
//                 console.log(encodedImageSrcString); //cGF0aC90by9maWxlLmpwZw==

//               }
//           )
//           .catch(
//               (error) => {
//                 chalk.red.bold(error); //Exepection error....
//               }
//           )
//       })
//       // files.forEach(value => {
//       //   const path = `diff_output/${value}`;
//       //   const params = {
//       //     Body: fs.readFileSync(
//       //       `./__tests__/__image_snapshots__/__diff_output__/${value}`
//       //     ),
//       //     Bucket: UPLOAD_BUCKET,
//       //     Key: path,
//       //     ContentType: 'image/png'
//       //   };
//         chalk.red.bold(`Image Diff Report Generated!`)
//       });
//     // }
//   }
// }

// module.exports = ImageReporter;

// const reporter = new ImageReporter();
// reporter.onTestResult();
