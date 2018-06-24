const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/client/index.jsx'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        include: /client/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: ['babel-plugin-styled-components'],
        },
      },
    ],
  },
  output: {
    filename: 'bundle-booking.js',
    path: path.join(__dirname, 'public'),
  },
};
