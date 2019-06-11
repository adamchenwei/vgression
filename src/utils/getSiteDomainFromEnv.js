const get = require('lodash').get;

module.exports = function getSiteDomainFromEnv(env) {
  const LOCAL_ENV = 'http://localhost:8080';
  let siteDomain = LOCAL_ENV;
  if (env) {
    const envParamsList = get(
      JSON.parse(get(env, 'npm_config_argv')),
      'original'
    );
    envParamsList.forEach(item => {
      if (item.includes('--env-ref-site') && !siteDomain) {
        siteDomain = item.split('=')[1];
      }
    });
  }

  return siteDomain;
};
