const puppeteer = require('puppeteer');
const chalk = require('chalk');
const buildUrl = require('./utils/buildUrl');
const generateBrowserArguments = require('./utils/generateBrowserArguments');
const runLogin = require('./runLogin');

module.exports = async ({
  domain,
  route,
  experimentName,
  experiementVariationName,
  headless,
  device,
  isVeryLargePage,
  isLoggedIn,
  isVariant

  // NOTE: does not work. not sure because can't execute two .evaluate?
  // hideScrollBar = true
}) => {
  // BROWSER SETUP BEG
  let browser;
  let browserArguments = generateBrowserArguments(isVeryLargePage);

  browser = await puppeteer.launch({
    headless,
    args: browserArguments
  });

  const page = await browser.newPage();
  // deciding which mobile device to choose from
  if (device) {
    await page.emulate(device);
  } else {
    await page.setViewport({
      width: 1440,
      height: 1080
    });
  }
  // BROWSER SETUP END

  // LOGIN BEG
  if (isLoggedIn) {
    const loginUrl = buildUrl(
      domain,
      '/app/login',
      experimentName,
      experiementVariationName,
      isVariant
    );
    await runLogin(page, loginUrl);
  }
  // LOGIN END

  // GO TO PAGE BEG
  const targetUrl = buildUrl(
    domain,
    route,
    experimentName,
    experiementVariationName,
    isVariant
  );
  console.log(chalk.magenta(targetUrl));
  const pageConfig = {
    timeout: 30000
  };

  // NOTE: this way tend to cause unexpected timeout and skip certain tests from time to time
  // const pageConfig = {
  //   waitUntil: 'networkidle2'
  // }
  await page.goto(targetUrl, pageConfig);

  // GO TO PAGE END

  return {
    page,
    browser
  };
};
