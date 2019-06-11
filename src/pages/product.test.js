const getPageImageShot = require('./../command/getPageImageShot');
const MOCK_SELECTOR_CONFIG_DESKTOP = [
  {
    target: {
      // main product image
      selector: '.product-image-zoomer'
    }
    // when mock property is ignored, an auto generated grey space mock
    // will be applied to its current sizing of the dom
    // do this, when you sure the sizing is static already, otherwise config
    // additional mock width and height to be more specific to reduce false positives
  },
  {
    target: {
      // product image gallery selections
      selector: '#media-selector > .bx-wrapper > .bx-viewport'
    }
  },
  {
    target: {
      // sale red tag
      selector: '#afterimageblock-feature > #image-overlays > div.sale-overlay'
    },
    mock: {
      // when want to create custom mock type or apply custom classes to
      // better simulate the existing element position by utilizing
      // the existing style while also mock the content
      elementType: 'div',
      classes: ['sale-overlay']
    }
  },
  {
    target: {
      // original price 1
      selector: '.pdp-autoship-price > span.ga-eec__price'
    },
    mock: {
      // text: '$5.99'
      width: '100px',
      height: '16px'
    }
  },
  {
    target: {
      // original price 2
      selector: '.product-pricing > .list-price > p.price'
    },
    mock: {
      // text: '$5.99'
      width: '100px',
      height: '16px',
      elementType: 'p',
      classes: ['price']
    }
  },
  {
    target: {
      // original price 3
      selector: '.pdp-autoship-row > p.cw-text__line-through'
    },
    mock: {
      // TODO: maybe I can offer an option to copy the original dom in all following attribute,
      // and only replace content into grey block to make the whole process of simulate existing dom easier?
      elementType: 'p',
      classes: ['cw-text__line-through', 'cw-type__body', 'cw-row__item'],
      dataAttributes: [
        {
          name: 'cw-row-span',
          value: '1-3'
        }
      ]
    }
  },
  {
    target: {
      // sale price
      selector: '.our-price > .price > .ga-eec__price'
    },
    mock: {
      // text: '$5.99'
      width: '100px',
      height: '16px',
      elementType: 'p',
      classes: ['ga-eec__price']
    }
  },
  {
    target: {
      // you saved total count 1
      selector: '.you-save > .price'
    },
    mock: {
      // text: '$4.99'
      width: '100px',
      height: '16px',
      classes: ['price']
    }
  },
  {
    target: {
      // you saved total count 2
      // NOTE: there is a problem with how it gets selected. may want to use [automation=sales-price] of some sort to make it more stable
      selector: '.pdp-autoship-row > .ga-eec__price'
    },
    mock: {
      // text: '$4.99'
      width: '100px',
      height: '16px',
      classes: ['price']
    }
  },
  {
    target: {
      // variation selection area
      selector: '#variation-Color'
    }
  },
  {
    target: {
      // autoship price
      selector: '.pdp-autoship.pdp-autoship__promotions p.cw-text__color--red'
    },
    mock: {
      // text: '$4.99'
      width: '100px',
      height: '16px'
    }
  },
  // description content
  {
    target: {
      selector: '.descriptions__content.cw-tabs__content--left'
    },
    mock: {
      height: '470px',
      classes: ['descriptions__content', 'cw-tabs__content--left']
    }
  },
  // promo video content
  {
    target: {
      selector: '.descriptions__content.cw-tabs__content--right'
    },
    mock: {
      height: '470px',
      classes: ['descriptions__content', 'cw-tabs__content--right']
    }
  },

  // promotion section
  {
    target: {
      selector: '.pdp-autoship-top-promotion'
    },
    mock: {
      width: '426.8px',
      height: '115px'
    }
  },

  // Pet Lovers Also Bought Sectin
  {
    target: {
      selector: '.recommendations .bx-wrapper'
    }
  }
];

jest.setTimeout(180000);

getPageImageShot({
  pageName: 'product page - unauthenticated',
  domain: undefined,
  // route: '/american-journey-peanut-butter-recipe/dp/152973',
  route: '/dp/160227',
  experimentName: '',
  experiementVariationName: '',
  isFullPage: true,
  //TODO: may need to distinguish mobile / desktop replacement, when there is fixed mock sizing involved
  mockSelectorsConfigList: [
    {
      device: 'desktop',
      list: MOCK_SELECTOR_CONFIG_DESKTOP
    }
  ],
  removeSelectorsList: [
    {
      device: 'desktop',
      list: ['#pdp-cms-includes']
    }
  ],
  headless: false,
  devices: 'all',
  isVeryLargePage: true,
  isLoggedIn: false,
  closeBrowserAfterSnapshot: false
});
