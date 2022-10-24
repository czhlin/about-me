// 代码语法是CommonJS模块，在这里可以使用大多数的JS语法和Node API。
// module.exports = {}
// module.exports = function () { return {} }
// module.exports = () => { return {} }
// module.exports = () => ({})

// 这是两个环境都需要的相同配置
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const build = require('./build');
const serve = require('./serve');

const config = {
  // 入口配置（建议在配置入口文件时使用绝对路径）
  // entry: './src/main.js',
  // entry: path.resolve(__dirname, 'src/main.js'),
  entry: {
    app: path.resolve(__dirname, '../src/main.js'),
  },

  // 出口配置（在配置出口时只能使用绝对路径）
  output: {
    // [chunkhash] 生成hash字符串的方式：每次打包，webpack根据当前chunk进行计算，如果发现有代码变化，就生成新的hash名；如果当前chunk没有代码变化，生成的hash名和上一次一样。
    filename: 'js/[name].[chunkhash].js', // 格式化字符串
    path: path.resolve(__dirname, '../dist'),
    // 实现自动清除output.path目录中的文件
    // 如果是v4，用 clean-webpack-plugin
    clean: true,
  },

  // 插件：是webpack中一些用于扩展的小插件
  plugins: [
    new webpack.EnvironmentPlugin({
      // PUBLIC_PATH: path.resolve(__dirname, 'public/')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public/'),
          to: path.resolve(__dirname, '../dist'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
      title: 'about me',
      inject: 'body',
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
    }),
    // 开启编译进度条
    new webpack.ProgressPlugin(),
  ],

  // loaders 用于加载各种各样的文件模块，并使用相应的编译器对这些模块进行编译
  // module 配置对各种各样的模块进行编译的规则 => loaders
  module: {
    rules: [
      // 第一条规则：当webpack运行时，如果遇到以.js为后缀的文件时，webpack就使用babel-loader来加载.js文件，然后交给Babel编译器（@babel/core、@babel/preset-env）进行编译转换，最终得到ES5代码。
      // babel-loader 专门用于加载javascript文件，然后交给Babel编译器进行编译。
      { test: /\.(js|jsx|ts|tsx)$/, use: [{ loader: 'babel-loader', options: {} }], include: /src/ },

      // 处理图片模块，下面是v4的写法
      // { test: /\.(png|jpg|jpeg|gif|webp|svg)$/, use: ['url-loader'] },
      // { test: /\.(png|jpg|jpeg|gif|webp|svg)$/, use: ['file-loader'] },

      // 处理图片模块，下面是v5的写法
      { test: /\.(png|svg|jpg|jpeg|gif)$/, type: 'asset/resource', exclude: [path.resolve(__dirname, '../src/icons')] },

      // 处理样式模块（v4和v5的写法是一样的）
      // 注意1：当同一个项目中使用sass、less、postcss、stylus等多种css预处理器时，我们要分别编写多条样式模块的解析规则。如果只有一种css预处理器，我们通常把处理.css的loader和处理当前这种css预处理器的loader写在一起。
      // 注意2：当同一条规则需要多个loader协同完成任务时，要注意loaders的顺序，数组中后面的loader先工作。
      { test: /\.svg$/, use: [{ loader: 'svg-sprite-loader', options: { symbolId: 'icon-[name]' } }], include: [path.resolve(__dirname, '../src/icons')] },
    ],
  },
  // 解析配置
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@@': path.resolve(__dirname, '../public'),
      'react': path.resolve(__dirname, '../node_modules/react/umd/react.development.js'),
    },
  },
};

module.exports = ({ development }) => merge(config, development ? serve : build);
