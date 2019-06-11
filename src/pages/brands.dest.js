// // NOTE: Brands Page is Extremely Large, But Not Popularly Utilized, so Ignore In Visual Regression To Improve Performance

// const getPageImageShot = require('./../command/getPageImageShot');
// const puppeteer = require('puppeteer');
// const devices = require('puppeteer/DeviceDescriptors');
// const iPhone = devices['iPhone 6'];

// jest.setTimeout(60000);
// describe('brands', () => {
//   // let browser;
//   // beforeAll(async () => {
//   //   browser = await puppeteer.launch({
//   //     headless: false,
//   //     args: [
//   //       '--no-sandbox',
//   //       '--disable-gpu',
//   //       '--max-texture-size=50000'
//   //     ]
//   //   });
//   // });
//   getPageImageShot('brands-automated', undefined, '/brands', '', '', true, '', false, 'all', true);
//   // it('should show correct page: default', async () => {
//   //   const page = await browser.newPage();
//   //   await page.goto('http://localhost:8080/brands');

//   //   // if (mockSelectorsConfigList) {
//   //   //   //TODO: future allow a list of doms to be removed, may need something like promise.all
//   //   //   await page.evaluate(sel => {
//   //   //     let elements = document.querySelectorAll(sel);
//   //   //     for (let i = 0; i < elements.length; i++) {
//   //   //       elements[i].parentNode.removeChild(elements[i]);
//   //   //     }
//   //   //   }, mockSelectorsConfigList);
//   //   // }

//   //   const image = await page.screenshot({ fullPage: true });
//   //   expect(image).toMatchImageSnapshot();
//   // });
//   // afterAll(async () => {
//   //   await browser.close();
//   // });
// });
