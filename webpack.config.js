const webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: {
    path: '/Users/mlding/Documents/JS/student-report-card-web',
    filename: 'static/bundle.js'
  },
  module: {
    //加载器适配
    loaders: [
    ]
  },
  resolve: {
  },
  devtool: 'source-map',
  plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jQuery",
            "windows.jQuery": "jquery"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"development"',
        })
    ],
  externals: {
  }
};
