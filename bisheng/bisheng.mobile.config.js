const path = require('path');
const commonConfig = require('./bisheng.common.config');

module.exports = Object.assign({}, commonConfig, {
  port: 8004,
  source: [
    './demos',
  ],
  output: './build/mobile',
  root: '/mobile/',
  entryName: 'mobile',
  theme: './site/mobile',
  htmlTemplate: path.join(__dirname, '..', 'template.mobile.html'),
  doraConfig: {
    verbose: true,
    plugins: ['dora-plugin-upload'],
  },
});
