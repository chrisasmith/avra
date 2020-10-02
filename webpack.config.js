const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const parseRoutePaths = require('./tools/parse-routes.js')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const BitBarWebpackStatusPlugin = require('bitbar-webpack-status-plugin')

const AssetsPlugin = require('assets-webpack-plugin')

const PROD = (process.env.NODE_ENV === 'production')
const CONFIG_ENV = process.env.CONFIG_ENV

// make sure a temp directory exists
if (!fs.existsSync('./.tmp')) {
  fs.mkdirSync('./.tmp/')
}

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist/')
}

// create routes file
parseRoutePaths('./src/client/javascripts/routes', path.join(__dirname, 'dist', 'routes.json'))

const clientConfig = {
  context: `${__dirname}/src/client/javascripts`,
  entry: {
    app: ['babel-polyfill', './index.js'],
    vendor: ['../stylesheets/vendor.scss'],
  },
  output: {
    filename: `app-webpack${(PROD ? '-[chunkhash]' : '')}.js`,
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/',
  },

  devtool: PROD ? 'source-map' : 'inline-source-map',

  node: {
    fs: 'empty',
  },

  externals: [
    {
      './cptable': 'var cptable',
    },
    {
      './jszip': 'jszip',
    },
  ],

  module: {
    loaders: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-2'],
            cacheDirectory: './.tmp',
          },
        },
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
            'autoprefixer-loader',
          ],
        }),
      },
      {
        include: path.resolve(__dirname, 'src/client/stylesheets/vendor.scss'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: false,
                sourceMap: false,
                importLoaders: 2,
                outputStyle: 'expanded',
              },
            },
            'fast-sass-loader',
            'autoprefixer-loader',
          ],
        }),
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, 'src/client/stylesheets/vendor.scss'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: true,
                importLoaders: 2,
                outputStyle: 'expanded',
                localIdentName: '[local]__[name]--[hash:base64:5]',
              },
            },
            'fast-sass-loader',
            'autoprefixer-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    autoprefixer,
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        context: __dirname,
        debug: true,
        displayErrorDetails: true,
        outputPathinfo: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.CONFIG_ENV': `"${CONFIG_ENV}"`,
    }),
    new BitBarWebpackStatusPlugin({ filePath: './.tmp/webpack-status' }),
    new ExtractTextPlugin(`[name]${(PROD ? '-[chunkhash]' : '')}.css`),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([{ from: '../images', to: 'images' }]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: `vendor-webpack${(PROD ? '-[chunkhash]' : '')}.js`,
      path: path.join(__dirname, 'dist', 'public'),
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      filename: `runtime-webpack${(PROD ? '-[chunkhash]' : '')}.js`,
      path: path.join(__dirname, 'dist', 'public'),
    }),
    new AssetsPlugin({
      path: path.join(__dirname, 'dist', 'public'),
      prettyPrint: true,
    }),
    new HtmlWebpackPlugin({
      template: `!!ejs-compiled-loader!${path.join(__dirname, 'src', 'server', 'templates', 'template-webpack.html')}`,
      filename: 'index.html',
      env: process.env.BUGSNAG_RELEASE_STAGE,
    }),
  ],
}

const serverConfig = {
  entry: [
    'babel-polyfill', './src/server/server.js',
  ],
  context: __dirname,
  node: {
    __filename: true,
    __dirname: true,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  target: 'node',
  externals: [
    nodeExternals(),
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader/locals?modules',
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-2'],
            cacheDirectory: './.tmp',
          },
        },
      },
    ],
  },
}

/**
 * @see http://webpack.github.io/docs/configuration.html
 * for webpack configuration options
 */
module.exports = [clientConfig, serverConfig]
