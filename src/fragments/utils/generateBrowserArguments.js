module.exports = function generateBrowserArguments(isVeryLargePage) {
  let browserArguments = ['--no-sandbox'];
  if (isVeryLargePage) {
    browserArguments.push('--disable-gpu');
    browserArguments.push('--max-texture-size=50000');
    browserArguments.push('--autocomplete=off');

    // NOTE: this is very important to reduce false positive in HEADLESS mode, the scrollbar still can produce false positive in visual mode
    browserArguments.push('--hide-scrollbars');

    // NOTE: this is not reallly needed...
    // browserArguments.push('--ignore-autocomplete-off-autofill=off');
    return browserArguments;
  }
}