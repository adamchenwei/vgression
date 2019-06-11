const puppeteer = require('puppeteer');
const getSiteDomainFromEnv = require('./../utils/getSiteDomainFromEnv');
const getEnvParamValue = require('./../utils/getEnvParamValue');
const path = require('path');
const rootDir = path.resolve(__dirname);
// console.log(rootDir);
// console.log('rootDir^^^^^^^^');
jest.setTimeout(60000);

const siteDomain = getEnvParamValue(
  process.env,
  '--env-ref-site',
  'http://localhost:8080'
);

const showVisibleBrowser = getEnvParamValue(
  process.env,
  '--env-show-browser-mode',
  false
);

// console.log('Site Domain: ', siteDomain);
// console.log('Open Browser: ', showVisibleBrowser);

describe('home page', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      // headless: Boolean(!showVisibleBrowser),
      headless: false,
      args: ['--no-sandbox']
    });
  });

  it('should show correct layout', async () => {
    const page = await browser.newPage();

    await page.goto(`${siteDomain}`);

    let domToRemove = '#testing-timer';
    await page.evaluate(sel => {
      let elements = document.querySelectorAll(sel);
      for (let i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i]);
      }
    }, domToRemove);

    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot({
      // customSnapshotsDir: rootDir
    });
  });

  it('should show another very perfect layout', async () => {
    const page = await browser.newPage();

    await page.goto(`${siteDomain}`);

    let domToRemove = '#testing-timer';
    await page.evaluate(sel => {
      let elements = document.querySelectorAll(sel);
      for (let i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i]);
      }
    }, domToRemove);

    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot({
      // customSnapshotsDir: rootDir
    });
  });

  afterAll(async () => {
    await browser.close();
  });
});
