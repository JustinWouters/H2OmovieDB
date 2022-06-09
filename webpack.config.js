const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',

  output: {
    path: path.join(__dirname, '/build'),
    // index.bundle is what will be used in the script tag in the index.html
    filename: 'bundle.js',
    publicPath: '/',
  },

  mode: process.env.NODE_ENV,

  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    open: true,
    compress: true,
    webSocketServer: 'ws',

    static: {
      directory: path.join(__dirname, 'build'),
      publicPath: '/',
    },

    headers: {
      'Access-Control-Allow-Origin': '*',
    },

    proxy: {
      '/api/**': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/assets/**': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },

    watchFiles: ['client'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      /*Choose only one of the following two: if you're using 
      plain CSS, use the first one, and if you're using a
      preprocessor, in this case SASS, use the second one*/
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: 'file-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  //whatever the bundle.js is will be injected into our index.html
  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html',
    }),
  ],
};
