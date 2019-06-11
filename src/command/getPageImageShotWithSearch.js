const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
const runProductSearch = require('./../fragments/runProductSearch');
// const getScreensize = require('../utils/getScreensize');
// // const getSiteDomainFromEnv = require('./../utils/getSiteDomainFromEnv');
// const getEnvParamValue = require('./../utils/getEnvParamValue');

// function buildUrl(
//   domain,
//   route,
//   experimentName,
//   experiementVariationName,
//   isVariant = false
// ) {
//   return `${domain}${route}${
//     experimentName || experiementVariationName ? '?' : ''
//   }${experimentName ? `experimentName=${experimentName}` : ''}${
//     experiementVariationName
//       ? `&experimentVariation=${
//           isVariant ? experiementVariationName : 'CONTROL'
//         }`
//       : ''
//   }`;
// }
jest.setTimeout(180000);

module.exports = function getPageImageShot({
  pageName = ' unnamed page',
  domain = 'http://localhost:8080',
  route = '/',
  // NOTE: in NON-headless mode, there will be stuck in navigation if loggedin and have experiment variants.
  experimentName = '',
  experiementVariationName = '',
  isFullPage = true,
  mockSelectorsConfigList = '',
  headless = true,
  devices = 'all',
  isVeryLargePage = true,
  isLoggedIn = false
}) {
  describe(pageName, () => {
    const config = {
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
      isVariant: false
    };
    if (devices === 'all' || devices === 'desktop') {
      describe('desktop', () => {
        it('CONTROL', async () => {
          await runProductSearch({
            ...config,
            device: null,
            isVariant: false
          }).then(image => {
            console.log('image default', image);
            expect(image).toMatchImageSnapshot({ threshold: 0.3 });
          });
        });

        // if (experimentName || experiementVariationName) {
        //   it(`VARIANT: ${experiementVariationName}`, async () => {
        //     await runProductSearch({
        //       ...config,
        //       device: null,
        //       isVariant: true
        //     }).then(image => {
        //       console.log('image variant', image);
        //       expect(image).toMatchImageSnapshot({ threshold: 0.3 });
        //     });
        //   });
        // }
      });
    }

    // if(devices === 'all' || devices === 'mobile') {
    //   describe('mobile', () => {
    //     it('CONTROL', async () => {
    //       await runProductSearch({
    //         ...config,
    //         device: iPhone,
    //         isVariant: false
    //       }).then(image => {
    //         console.log('image default', image);
    //         expect(image).toMatchImageSnapshot({ threshold: 0.3 });
    //       });
    //     });

    //     it(`VARIANT: ${experiementVariationName}`, async () => {
    //       await runProductSearch({
    //         ...config,
    //         device: iPhone,
    //         isVariant: true
    //       }).then(image => {
    //         console.log('image default', image);
    //         expect(image).toMatchImageSnapshot({ threshold: 0.3 });
    //       });
    //     });
    //   });
    // }
  });
};
