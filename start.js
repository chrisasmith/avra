require('babel-register')({
  presets: ['env'],
})

module.exports = require('./src/server/server.js')
