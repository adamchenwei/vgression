const getPageImageShot = require('./../command/getPageImageShot');

jest.setTimeout(180000);

getPageImageShot({
  pageName: 'account-orderhistory page - authenticated',
  domain: 'https://www-qa.chewy.net',
  route: '/app/account/orderhistory',
  experimentName: '2019_04_STREAMLINED_LOGIN',
  experiementVariationName: 'STREAMLINED',
  // experimentName: '',
  // experiementVariationName: '',
  isFullPage: true,
  mockSelectorsConfigList: '',
  headless: false,
  devices: 'all',
  isVeryLargePage: true,
  isLoggedIn: true
});

getPageImageShot({
  pageName: 'account-orderhistory page - unauthenticated',
  domain: 'https://www-qa.chewy.net',
  route: '/app/account/orderhistory',
  experimentName: '2019_04_STREAMLINED_LOGIN',
  experiementVariationName: 'STREAMLINED',
  // experimentName: '',
  // experiementVariationName: '',
  isFullPage: true,
  mockSelectorsConfigList: '',
  headless: false,
  devices: 'all',
  isVeryLargePage: true,
  isLoggedIn: false
});

