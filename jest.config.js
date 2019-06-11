module.exports = {
  // TODO: SFW-9087: enable additional config in setup file for fixing test by properly mocking global deps
  // setupFilesAfterEnv: ['./jest.setup.js'],

  // NOTE: in newer version of jest, it (likely) becomes setupFilesAfterEnv for v24+
  // for v24
  setupFilesAfterEnv: ['./jest-post-env-setup.js'],
  // for v23
  // setupTestFrameworkScriptFile: './jest-post-env-setup.js',

  //image reporter
  reporters: ['default', './image-reporter.js'],

  // moduleFileExtensions: ['js', 'json', 'vue'],
  moduleFileExtensions: ['js', 'json'],
  // modulePathIgnorePatterns: [
  //   // NOTE: this was here because bamboo will blow up when jest is running
  //   'common-js/yarncache',
  //   '/gradle/lib'
  // ],
  // moduleNameMapper: {
  //   'storefront-kt': '<rootDir>/src/main/js/entry/storefront-kt.js'
  // },
  transform: {
    '^.+\\.js$': 'babel-jest'
    // '^.+\\.vue$': 'vue-jest'
  },
  testPathIgnorePatterns: ['<rootDir>[/\\\\](\\.cache|node_modules)[/\\\\]']
  // transformIgnorePatterns: ['/node_modules/(?!(@chewy/design-system))'],
  // coverageThreshold: {
  //   global: {
  //     branches: 5,
  //     functions: 8,
  //     lines: 10,
  //     statements: 37.44
  //   }
  // }
};
