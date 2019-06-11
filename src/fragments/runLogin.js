const chalk = require('chalk');

module.exports = async (page, loginUrl) => {
  console.log(chalk.yellow(loginUrl));

  await page.goto(loginUrl, {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForSelector('input#username');
  await page.click('input#username');
  await page.type('input#username', 'adamchenwei.tester@gmail.com');

  await page.waitForSelector('input#password');
  await page.click('input#password');
  await page.type('input#password', 'adamchenwei.tester@gmail.com');
  await Promise.all([
    // console.log(chalk.green('wait for nav BEG...'))
    // NOTE: because account page for some reason CAN stuck on loading for VPN and such,
    // waitForNavigation is not feasible, even its the best way to do it, so in case use the option with timeout delay below
    page.waitForNavigation(),
    page.click('input[name=submitForm]')
    // console.log(chalk.green('wait for nav ENDED!'));
  ]);

  // NOTE: option for using timeout delay instead
  // page.click('input[name=submitForm]')
  // await delay(5000);
}
