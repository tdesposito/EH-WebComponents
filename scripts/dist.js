const fs = require('fs')
const glob = require('glob')

const config = require('../package.json')

if (! fs.existsSync('dist')) { fs.mkdirSync('dist') }
glob("+(build|bundle)/*.min.js", (err, files) => {
  files.map(async (f) => {
    console.log(`copy ${f} to dist/`)
    var target = f.replace('build/', 'dist/').replace('bundle/', 'dist/')
    fs.copyFileSync(f, target)
  })
})
