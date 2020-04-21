const path = require('path');

module.exports = {
  entry: './src/index.js', // start from here
  output: { // bundle all modules that we depend on under public in bundle.js
    path: path.resolve('public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { // for every file that ends with .js, run the babel loader on it
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader' // transforms non-standard javascript that we'll be using
        }
      }
    ]
  }
};
