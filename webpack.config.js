const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')

module.exports = {
  mode: "production",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }, {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new DefinePlugin({
      TITLE: '"记录生活"'
    })
  ],

  devServer: {
    hot: true,
    open: true
  },

  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
    alias: {
      "@": path.resolve(__dirname, './')
    }
  }
}
