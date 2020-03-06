// https://github.com/timarney/react-app-rewired
const path = require('path');
// https://github.com/arackaf/customize-cra
const { override, addWebpackAlias } = require('customize-cra');

const test = () => (config) => {
  if (process.env.NODE_ENV === 'production') {
    if (!config.output) {
      config.output = {};
    }
    const custom = require('./src/custom.conf.json');
    config.output.publicPath = custom.publicPath + '/';
  }
  return config;
};

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  test()
);
