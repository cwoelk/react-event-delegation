const webpack = require('webpack');
const path = require('path');

const environment = process.env.NODE_ENV; // eslint-disable-line no-process-env

const babelPresets = [];

const webpackLoaders = [
  {
    test: /\.js$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader',
    query: { presets: babelPresets },
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
];

const webPackConfig = {
  entry: {
    main: ['./client/main'],
    vendor: ['react', 'react-dom', 'babel-polyfill'],
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public', 'js', 'min'),
    publicPath: '/js',
  },

  resolve: {
    alias: {
      'material-ui': 'material-ui/lib',
    },
    root: __dirname,
  },

  module: {
    loaders: webpackLoaders,
    noParse: [],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(environment) }),
  ],
};

if (environment === 'development') {
  webPackConfig.debug = true;
  webPackConfig.output.publicPath = '/js';
  webPackConfig.devtool = 'cheap-module-source-map';
  webPackConfig.entry.vendor.push('webpack-hot-middleware/client?path=/__webpack_hmr');
  webPackConfig.plugins.unshift(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );

  babelPresets.push('react-hmre');
}

if (environment === 'production') {
  webPackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      dead_code: true,
    },
  }));
}

module.exports = webPackConfig;
