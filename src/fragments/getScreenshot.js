const chalk = require('chalk');

function getListForDevice(device, configList) {
  const resultConfigList = configList.filter(listItem => {
    return listItem.device === 'all' || listItem.device === device;
  });
  const concatList = [];
  resultConfigList.forEach(listCollection => {
    listCollection.list.forEach(item => concatList.push(item));
  });
  return concatList;
}
module.exports = async ({
  page,
  browser,
  isFullPage,
  mockSelectorsConfigList = [],
  device = 'desktop',
  removeSelectorsList = [],
  closeBrowserAfterSnapshot = true
}) => {
  //Thinking of moving this whole section as runSnapScreenshot.js BEG
  // function delay(timeout) {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, timeout);
  //   });
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

  // MOCK DOM BEG
  console.log(chalk.green('------------- MOCK BEG'));
  // console.log(replaceElementWithMock);
  if (
    (mockSelectorsConfigList && mockSelectorsConfigList.length) ||
    (removeSelectorsList && mockSelectorsConfigList.length)
  ) {
    const currentMockList = getListForDevice(device, mockSelectorsConfigList);
    const currentRemoveList = getListForDevice(device, removeSelectorsList);
    await page.evaluate(
      ({ mockSelectors, removeSelectors }) => {
        console.log('removeSelectors', removeSelectors);
        console.log('mockSelectors', mockSelectors);
        function replaceElementWithMock(
          el,
          { width, height, text, elementType, classes, dataAttributes }
        ) {
          const element = el;
          let mockSpace = null;
          if (text && (width || height || elementType || classes)) {
            console.warn(
              `text of ${text} is going to override other mock configs, please adjust accordingly to avoid errors`
            );
          }
          if (text) {
            element.innerText = text;
          } else {
            const {
              width: rectWidth,
              height: rectHeight
            } = element.getBoundingClientRect();
            mockSpace = document.createElement(elementType || 'section');
            mockSpace.style.width = width || `${rectWidth}px`;
            mockSpace.style.height = height || `${rectHeight}px`;
            mockSpace.style.backgroundColor = 'grey';
            if (classes && classes.length) {
              classes.forEach(classItem => {
                mockSpace.classList.add(classItem);
              });
            }

            if (dataAttributes && dataAttributes.length) {
              dataAttributes.forEach(datAttribute => {
                console.log('setting data attribute...', datAttribute);
                mockSpace.dataset[datAttribute.name] = datAttribute.value;
              });
            }
            element.parentNode.replaceChild(mockSpace, element);
          }
        }
        console.log('replaceElementWithMock', replaceElementWithMock);

        if (mockSelectors.length) {
          // NOTE: everything here will be executing inside the chrome instance, not in console!
          // console.log('elements list - MOCK_ELEMENTS_LIST', MOCK_ELEMENTS_LIST);
          mockSelectors.forEach((config, index) => {
            console.log(`config ${index}`, config);
            if (!config.target.selector)
              console.warn(
                'one of the mockSelectors is empty string or invalid!'
              );
            const selectedElements = document.querySelectorAll(
              config.target.selector
            );
            if (selectedElements.length) {
              selectedElements.forEach(element => {
                replaceElementWithMock(element, config.mock || {});
              });
            } else {
              console.warn(
                `${
                  config.target.selector
                } did not produce any matching elements on the page from mockSelectors`
              );
            }
          });
        }

        if (removeSelectors.length) {
          removeSelectors.forEach(selector => {
            if (!selector)
              console.warn(
                'one of the removeSelectors is empty string or invalid!'
              );
            const selectedElements = document.querySelectorAll(selector);

            if (selectedElements && selectedElements.length) {
              selectedElements.forEach(element => {
                element.parentNode.removeChild(element);
              });
            } else {
              console.warn(
                `${selector} did not produce any matching elements on the page from removeSelectors`
              );
            }
          });
        }
      },
      { mockSelectors: currentMockList, removeSelectors: currentRemoveList }
    );
    console.log(chalk.green('------------- MOCK END'));
    // MOCK DOM END
  }

  const image = await page.screenshot({ fullPage: isFullPage });
  console.log(chalk.blue('runPageView before browser close'));
  if (closeBrowserAfterSnapshot) {
    await browser.close();
  }
  console.log(chalk.blue('runPageView after browser close'));
  return image;
};
