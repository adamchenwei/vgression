module.exports = function getScreensize(sizeName) {
  switch (sizeName) {
    case 'desktop':
      return {
        width: 1280,
        height: 768
      };
    case 'mobile': {
      return {
        // pixel 2
        width: 411,
        height: 731
      };
    }
    default:
      return {
        width: null,
        height: null
      };
  }
};
