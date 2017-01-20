const path = require('path');
// const configSvg = require('../svg.config');

module.exports = {
  lazyLoad: false,
  plugins: [
    'bisheng-plugin-react?lang=__react',
    'bisheng-plugin-uxcore'
  ],
  
  webpackConfig(config) {
    config.externals = {
      react: 'var React',
      'react-dom': 'var ReactDOM',
      'react/lib/ReactCSSTransitionGroup': 'var React.addons.CSSTransitionGroup',
      'salt-ui': 'var SaltUI',
    };
    return config;
  }
 
};
