module.exports = {
  entry: './src/Bee.js',
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: './dist',
    filename: 'bee.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: '6to5-loader'
    }]
  }
};
