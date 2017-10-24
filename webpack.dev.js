const path = require('path');
// const Happypack = require('happypack');

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
          path.join(process.cwd(), './index.js'),
        ],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-1'],
          plugins: [
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
          presets: ['react', 'env', 'stage-1'],
          cacheDirectory: true,
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg2react-loader',
        include: [path.join(process.cwd(), './src')],
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
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
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
  plugins: [],
};
