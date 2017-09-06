const webpack = require('webpack');
const path = require('path');
const Happypack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const upperInitWord = str => str.split('-').map(key => (key[0].toUpperCase() + key.slice(1))).join('');


module.exports = {
  cache: true,
  entry: {
    demo: './dev/index',
  },
  output: {
    path: path.join(process.cwd(), './dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
  },
  module: {
    rules: [
      {

        test: /\.js(x)*$/,
        include: [
          path.join(process.cwd(), './src'),
          path.join(process.cwd(), './demo'),
          path.join(process.cwd(), './test'),
          path.join(process.cwd(), './dev'),
        ],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015-ie', 'stage-1'],
          plugins: [
            'transform-es3-member-expression-literals',
            'transform-es3-property-literals',
            'add-module-exports',
          ],
          cacheDirectory: true,
        },
      },
      {
        test: /\.svg$/,
        loader: 'babel-loader',
        include: [path.join(process.cwd(), './src')],
        query: {
          presets: ['react', 'es2015-ie'],
          cacheDirectory: true,
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg2react-loader',
        include: [path.join(process.cwd(), './src')],
      },
      {
        test: /\.js(x)*$/,
        loader: 'es3ify-loader',
        enforce: 'post',
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'stylus-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.web.ts', '.web.tsx', '.web.js', '.web.jsx', '.ts', '.tsx', '.js', '.jsx', '.json'],
    mainFields: ['main'],
  },
  externals: {
    react: 'var React',
    'react-dom': 'var ReactDOM',
  },
  plugins: [
    new BrowserSyncPlugin({
      server: {
        baseDir: './',
      },
      open: 'external',
    }),
    // SourceMap plugin will define process.env.NODE_ENV as development
    new webpack.SourceMapDevToolPlugin({
      columns: false,
    }),
    new ProgressBarPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /salt-(.+)/,
      (resource) => {
        /* eslint-disable no-param-reassign */
        if (resource.request.indexOf('salt-icon') === -1) {
          resource.request = resource.request.replace(/salt-(.+)/, (match, s1) => {
            return require.resolve(`./src/${upperInitWord(s1)}`);
          });
          console.log(resource.request);
        }
        /* eslint-enable no-param-reassign */
      }
    ),
  ],
};
