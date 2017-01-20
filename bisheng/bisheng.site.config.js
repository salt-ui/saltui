const path = require('path');
const commonConfig = require('./bisheng.common.config');


module.exports = Object.assign({}, commonConfig, {
  port: 8003,
  source: [
    './components',
    './demos'
  ],
  output: './build',
  theme: './site/theme',
  htmlTemplate: path.join(__dirname, '..', 'template.html'),
  doraConfig: {
    verbose: true,
  },
  // pick: {
  //   components(markdownData) {
  //     console.log(markdownData)
  //     return {
  //       meta: markdownData.meta,
  //       // description: markdownData.description,
  //     };
  //   }
  // }
});
