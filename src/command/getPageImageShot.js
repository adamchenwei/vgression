// const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const runPageView = require('./../fragments/runPageView');
const getScreenshot = require('./../fragments/getScreenshot');
const iPhone = devices['iPhone 6'];
const delay = require('./../utils/delay');

// const getScreensize = require('../utils/getScreensize');
// // const getSiteDomainFromEnv = require('./../utils/getSiteDomainFromEnv');
// const getEnvParamValue = require('./../utils/getEnvParamValue');

jest.setTimeout(30000);

module.exports = function getPageImageShot({
  pageName = ' unnamed page',
  domain = 'http://localhost:8080',
  route = '/',
  // NOTE: in NON-headless mode, there will be stuck in navigation if loggedin and have experiment variants.
  experimentName = '',
  experiementVariationName = '',
  isFullPage = true,
  mockSelectorsConfigList = [],
  removeSelectorsList = [],
  headless = true,
  devices = 'all',
  isVeryLargePage = true,
  isLoggedIn = false,
  closeBrowserAfterSnapshot = true
}) {
  const testSuiteConfig = {
    domain,
    route,
    experimentName,
    experiementVariationName,
    isFullPage,
    mockSelectorsConfigList,
    headless,
    device: null,
    isVeryLargePage,
    isLoggedIn,
    isVariant: false,
    closeBrowserAfterSnapshot
  };
  describe(pageName, () => {
    if (devices === 'all' || devices === 'desktop') {
      describe('desktop', () => {
        it('CONTROL', async () => {
          console.log('CONTROL DESKTOP testSuiteConfig', testSuiteConfig);
          const currentPageAndBrowser = await runPageView({
            ...testSuiteConfig,
            device: null,
            isVariant: false
          });
          await delay(2000);
          const image = await getScreenshot({
            ...currentPageAndBrowser,
            isFullPage,
            mockSelectorsConfigList,
            removeSelectorsList,
            closeBrowserAfterSnapshot
          });

          console.log('image default desktop', image);
          expect(image).toMatchImageSnapshot({ threshold: 0.3 });
        });

        // if (experimentName || experiementVariationName) {
        //   it(`VARIANT: ${experiementVariationName}`, async () => {
        //     console.log('VARIANT DESKTOP testSuiteConfig', testSuiteConfig);
        //     const currentPageAndBrowser = await runPageView({
        //       ...testSuiteConfig,
        //       device: null,
        //       isVariant: true
        //     });
        //     const image = await getScreenshot({
        //       ...currentPageAndBrowser,
        //       isFullPage,
        //       mockSelectorsConfigList,
        //       removeSelectorsList,
        //       closeBrowserAfterSnapshot
        //     });

        //     console.log('image variant desktop', image);
        //     expect(image).toMatchImageSnapshot({ threshold: 0.3 });
        //   });
        // }
      });
    }

    /**
     * TODO: Also add emulate(iPad) as well for table screen size!!!
     * devce = 'tablet'
     */

    //   if (devices === 'all' || devices === 'mobile') {
    //     describe('mobile', () => {
    //       it('CONTROL', async () => {
    //         console.log('CONTROL MOBILE testSuiteConfig', testSuiteConfig);
    //         const currentPageAndBrowser = await runPageView({
    //           ...testSuiteConfig,
    //           device: iPhone,
    //           isVariant: false
    //         });
    //         const image = await getScreenshot({
    //           ...currentPageAndBrowser,
    //           isFullPage,
    //           mockSelectorsConfigList,
    //           removeSelectorsList,
    //           device: testSuiteConfig.device,
    //           closeBrowserAfterSnapshot
    //         });

    //         console.log('image CONTROL mobile', image);
    //         expect(image).toMatchImageSnapshot({ threshold: 0.3 });
    //       });

    //       // if (experimentName || experiementVariationName) {
    //       //   it(`VARIANT: ${experiementVariationName}`, async () => {
    //       //     console.log('VARIANT MOBILE testSuiteConfig', testSuiteConfig);
    //       //     const currentPageAndBrowser = await runPageView({
    //       //       ...testSuiteConfig,
    //       //       device: iPhone,
    //       //       isVariant: false
    //       //     });
    //       //     const image = await getScreenshot({
    //       //       ...currentPageAndBrowser,
    //       //       isFullPage,
    //       //       mockSelectorsConfigList,
    //       //       removeSelectorsList,
    //       //       closeBrowserAfterSnapshot
    //       //     });

    //       //     console.log('image VARIANT mobile', image);
    //       //     expect(image).toMatchImageSnapshot({ threshold: 0.3 });
    //       //   });
    //       // }
    //     });
    //   }
  });
};
