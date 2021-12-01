const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ],
  devServer: {
    // 从目录提供静态文件的选项（默认是 'public' 文件夹）。将其设置为 false 以禁用
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    // 启用 gzip compression：
    compress: true,
    // 在服务器已经启动后打开浏览器
    open: true,
    // 端口
    port: 9000,
    hot: true,
  },
};
