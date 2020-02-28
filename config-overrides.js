// https://github.com/timarney/react-app-rewired
const path = require('path');
// https://github.com/arackaf/customize-cra
const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  })
);
