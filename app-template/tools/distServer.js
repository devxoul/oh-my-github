// This file configures a web server for testing the production build
// on your local machine.

var browserSync = require('browser-sync')

// Run Browsersync
browserSync({
  port: 3000,
  ui: {
    port: 3001
  },
  server: {
    baseDir: ['dist', 'resource']
  },

  files: [
    'src/*.html',
    'resource/oh-my-gtihub.json'
  ],

  routes: {
    'oh-my-github.json': '../resource/oh-my-github.json'
  }
})
