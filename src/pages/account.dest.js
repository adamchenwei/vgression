const getPageImageShot = require('./../command/getPageImageShot');

jest.setTimeout(180000);

getPageImageShot({
  pageName: 'account page - authenticated',
  domain: undefined,
  route: '/app/account',
  experimentName: '2019_04_STREAMLINED_LOGIN',
  experiementVariationName: 'STREAMLINED',
  isFullPage: true,
  mockSelectorsConfigList: '',
  headless: true,
  devices: 'all',
  isVeryLargePage: true,
  isLoggedIn: true
});
