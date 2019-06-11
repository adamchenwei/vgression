// const puppeteer = require('puppeteer');
// const devices = require('puppeteer/DeviceDescriptors');
// const iPhone = devices['iPhone 6'];
// const getScreensize = require('../utils/getScreensize');
// // const getSiteDomainFromEnv = require('./../utils/getSiteDomainFromEnv');
// const getEnvParamValue = require('./../utils/getEnvParamValue');

// // const path = require('path');
// // const rootDir = path.resolve(__dirname);
// // console.log(rootDir);
// // console.log('rootDir^^^^^^^^');
// jest.setTimeout(60000);

// const siteDomain = getEnvParamValue(
//   process.env,
//   '--env-ref-site',
//   'http://localhost:8080'
// );
// const showVisibleBrowser = getEnvParamValue(
//   process.env,
//   '--env-show-browser-mode',
//   false
// );

// console.log('Site Domain: ', siteDomain);
// console.log('Open Browser: ', showVisibleBrowser);

// describe('create account page', () => {
//   let browser;

//   beforeAll(async () => {
//     browser = await puppeteer.launch({
//       // headless: Boolean(!showVisibleBrowser),
//       headless: false,
//       args: ['--no-sandbox']
//     });
//   });

//   it('should show correct page: variant and filled with name', async () => {
//     const screensize = getScreensize('mobile');
//     console.log('screensize', screensize);
//     const page = await browser.newPage();
//     await page.emulate(iPhone);

//     console.log('---current test siteDomain: ', siteDomain);
//     await page.goto(
//       `${siteDomain}/app/register?experimentName=2018_12_STREAMLINED_ACCOUNT&experimentVariation=STREAMLINED#/`
//     );
//     await page.waitForSelector('input[automation=name]');
//     await page.click('input[automation=name]');
//     await page.type('input[automation=name]', 'Adam Chen Wei');

//     await page.click('input[automation=username]');
//     await page.type(
//       'input[automation=username]',
//       'adamchenwei.tester@gmail.com'
//     );

//     await page.click('input[automation=password]');
//     await page.type(
//       'input[automation=password]',
//       'adamchenwei.tester@gmail.com'
//     );

//     const image = await page.screenshot();

//     expect(image).toMatchImageSnapshot();
//   });

//   it('should show correct page: default', async () => {
//     const page = await browser.newPage();
//     await page.goto(
//       'http://localhost:8080/app/register?experimentName=2018_12_STREAMLINED_ACCOUNT&experimentVariation=CONTROL#/'
//     );
//     const image = await page.screenshot();

//     expect(image).toMatchImageSnapshot();
//   });

//   afterAll(async () => {
//     await browser.close();
//   });
// });
