const webpack = require('webpack');
const path = require('path');
const SwaggerJSDocWebpackPlugin = require('swagger-jsdoc-webpack-plugin');

module.exports = {
  entry: ['./src/index.ts'],
  watch: false,
  target: 'node',
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: 'vendors.js',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore', 'mssql'],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'production',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new SwaggerJSDocWebpackPlugin({
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'Title',
          version: '1.0.0',
          description: 'Description',
        },
      },
      apis: ['./src/**/*.router.ts'],
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
};
