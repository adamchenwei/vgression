const getPageImageShot = require('./../command/getPageImageShot');

jest.setTimeout(180000);

const MOCK_ELEMENTS_LIST = [
  {
    target: {
      selector: '.cw-hero > .bx-wrapper > .bx-viewport'
    }
  },
  {
    target: {
      selector: '.cw-stars > picture > img'
    }
  },
  {
    target: {
      selector: '.carousel-img > img',
    },
    mock: {
      width: '100px',
      height: '112px'
    }
  },
  {
    target: {
      selector: '.carrousel-img > img',
    },
    mock: {
      width: '100px',
      height: '112px'
    }
  },
  {
    target: {
      selector: '.js-banner > a > p',
    },
    mock: {
      width: '100px',
      height: '16px'
    }
  }
];

getPageImageShot({
  pageName: 'home page - unauthenticated',
  domain: 'https://www-qa.chewy.net',
  route: '/',
  experimentName: '',
  experiementVariationName: '',
  isFullPage: true,
  mockSelectorsConfigList: MOCK_ELEMENTS_LIST,
  headless: false,
  devices: 'all',
  isVeryLargePage: true,
  isLoggedIn: false
});
