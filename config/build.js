// 这是build时的专用配置
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      { test: /\.(css|scss|sass)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
    ],
  },
  plugins: [
    // 抽离css文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
    }),
  ],
};
