const SEARCH_TEXT =
  'Blue Buffalo Basics Limited Ingredient Grain-Free Formula Lamb & Potato Recipe Adult Dry Dog Food';
const puppeteer = require('puppeteer');
const chalk = require('chalk');
const buildUrl = require('./utils/buildUrl');
const generateBrowserArguments = require('./utils/generateBrowserArguments');
const runLogin = require('./runLogin');
const runPageView = require('./runPageView');

module.exports = async ({
  domain,
  route,
  experimentName,
  experiementVariationName,
  isFullPage,
  mockSelectorsConfigList,
  headless,
  device,
  isVeryLargePage,
  isLoggedIn,
  isVariant

  // NOTE: does not work. not sure because can't execute two .evaluate?
  // hideScrollBar = true
}) => {
  const { page, browser } = await runPageView({
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
  });
  // Search a product BEG
  await page.waitForSelector('input[name=query]');
  await page.click('input[name=query]');
  await page.type('input[name=query]', SEARCH_TEXT);
  // Search a product END

  // enter PDP BEG
  await Promise.all([
    // console.log(chalk.green('wait for nav BEG...'))
    // NOTE: because account page for some reason CAN stuck on loading for VPN and such,
    // waitForNavigation is not feasible, even its the best way to do it, so in case use the option with timeout delay below
    page.waitForNavigation(),
    page.click('button[name=nav-submit-button]')
    // console.log(chalk.green('wait for nav ENDED!'));
  ]);
  // enter PDP END

  // {
  //   waitUntil: 'networkidle2'
  // }

  // NOTE: does not work. not sure because can't execute two .evaluate?
  //        maybe resolve by moving this into same evaluate
  // if (hideScrollBar) {
  //   await page.evaluate(() => {
  //     console.log('----------------adding the style to head!!!!!!!')
  //     const css = 'html::-webkit-scrollbar{display:none;}';
  //     const head = document.head || document.getElementsByTagName('head')[0];
  //     const style = document.createElement('style');
  //     head.appendChild(style);
  //     style.type = 'text/css';
  //     style.appendChild(document.createTextNode(css));
  //   });
  // }
  // await delay(100000);

  if (mockSelectorsConfigList) {
    console.log(chalk.yellow('--- ignore dom BEG'));
    //TODO: future allow a list of doms to be removed, may need something like promise.all
    await page.evaluate(sel => {
      let elements = document.querySelectorAll(sel);
      for (let i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i]);
      }
    }, mockSelectorsConfigList);
    console.log(chalk.yellow('--- ignore dom END'));
  }

  const image = await page.screenshot({ fullPage: isFullPage });
  console.log(chalk.blue('runPageView before browser close'));
  await browser.close();
  console.log(chalk.blue('runPageView after browser close'));
  return image;
};
