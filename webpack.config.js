const path = require('path');

module.exports = {
  entry: './functions/bot.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bot.js'
  },
  mode: 'development',
  target: 'node'
};
