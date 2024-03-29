const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const SwaggerJSDocWebpackPlugin = require('swagger-jsdoc-webpack-plugin');

module.exports = {
  entry: ['webpack/hot/poll?100', './src/index.ts'],
  watch: true,
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
    fs: 'empty',
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
