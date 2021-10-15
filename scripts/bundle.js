const fs = require('fs')
const glob = require('glob')
const { minify } = require('terser')

const config = require('../package.json')

const PREAMBLE = `// This file is derived from EH-WebComponents, Copyright (C) Todd D. Esposito 2021.
// Distributed under the MIT License (see https://opensource.org/licenses/MIT).
`
const included = process.argv.slice(2)


if (! fs.existsSync('build')) {
  console.log('Please run build before bundle!')
} else {
  if (! fs.existsSync('bundle')) { fs.mkdirSync('bundle') }
  var target = "ehcomponents-bundle"
  if (included.length) {
    target = "ehcomponents-custom-bundle"
  }
  var bundle = fs.createWriteStream(`bundle/${target}.min.js`)
  bundle.write(PREAMBLE)

  glob("build/*.min.js", (err, files) => {
    files.map(async (f) => {
      if (included.length === 0
          || included.includes(f.replace('build/eh-', '').replace('.min.js',''))) {
        console.log(`Adding ${f} to dist/${target}.min.js`)
        let result = await minify(fs.readFileSync(f).toString())
        bundle.write(result.code)
      }
    })
  })
}
