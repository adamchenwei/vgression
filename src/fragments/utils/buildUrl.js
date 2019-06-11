module.exports = function buildUrl(
  domain,
  route,
  experimentName,
  experiementVariationName,
  isVariant = false
) {
  return `${domain}${route}${
    experimentName || experiementVariationName ? '?' : ''
  }${experimentName ? `experimentName=${experimentName}` : ''}${
    experiementVariationName
      ? `&experimentVariation=${
          isVariant ? experiementVariationName : 'CONTROL'
        }`
      : ''
  }`;
};
