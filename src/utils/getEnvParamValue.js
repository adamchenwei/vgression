const get = require('lodash').get;

module.exports = function getEnvParamValue(env, configName, defaultValue) {
  let paramValue = defaultValue;
  // console.log(env);
  if (env) {
    const envParamsList = get(
      JSON.parse(get(env, 'npm_config_argv')),
      'original'
    );
    envParamsList.forEach(item => {
      // console.log(item);
      if (item.includes(configName)) {
        paramValue = item.split('=')[1];
        // console.log('paramValue', paramValue);
      }
    });
  }

  return paramValue;
};
