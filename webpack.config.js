const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

module.exports = {
  entry: ['./src/',],
  mode: 'development',
  devServer: {
    // if 404 it serves index as an answer
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 8080,
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mybundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'img/',
            publicPath: 'img/',
            esModule: true,
          }
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS - first step to translate SCSS for webpack (here in css)
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },


    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "My React App 2022",
      template: path.join(__dirname, "src", "index.html"),
      hash: true
    }),
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
      inlineAll: true,
    })
  ],
}
