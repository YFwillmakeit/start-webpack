const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //  需要用解构赋值才是插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 直接用就是插件，不用解构赋值
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RemoveCommentsPlugin = require('./remove-comments-plugin'); // 引入自定义的插件
module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 根据打包过程中所遇到文件路径匹配是否使用这个loader
        use: [// 写的时候注意顺序，从下往上执行的。
            'style-loader',
            'css-loader'   // 指定具体的loader
        ]
      },
      {
        test: /\.md$/, // 根据打包过程中所遇到文件路径匹配是否使用这个loader
        use: [// 写的时候注意顺序，从下往上执行的。
            // 'html-loader',
          './md-loader'
        ]
      }
    ]
  },
  plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ // 用于生成index.html文件
        title: '旺旺旺',
        meta: {
          viewport: 'width = device-width'
        },
        template: './src/index.html'
      }),
      new HtmlWebpackPlugin({ // 用于生成about.html文件
        filename: 'about.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public', to: 'dest' }
        ]
      }),
      new RemoveCommentsPlugin()
  ]

}
