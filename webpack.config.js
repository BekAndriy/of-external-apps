// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    open: false,
    host: 'localhost',
    hot: true,
    historyApiFallback: true,
    port: 3000,
    static: {
      directory: path.resolve(__dirname, './mocks'),
      publicPath: '/mocks'
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    alias: {
      '~services': path.resolve(process.cwd(), './src/services'),
      '~components': path.resolve(process.cwd(), './src/components'),
      '~utils': path.resolve(process.cwd(), './src/utils'),
      '~configs': path.resolve(process.cwd(), './src/configs'),
      '~api': path.resolve(process.cwd(), './src/api'),
      '~store': path.resolve(process.cwd(), './src/store'),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
    config.plugins.push(new MiniCssExtractPlugin());
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    config.plugins.push(new CopyPlugin({
      patterns: [
        'mocks/*.json',
        'mocks/RSI/*.json'
      ],
    }))
  } else {
    config.mode = 'development';
  }
  return config;
};
