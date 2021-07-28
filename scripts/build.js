const fs = require('fs')
const glob = require('glob')
const { minify } = require('terser')
const htmlmin = require('html-minifier').minify

const config = require('../package.json')

const HTML_START_TAG = '<!-- ##HTML -->'
const HTML_END_TAG = '<!-- ##/HTML -->'

const PREAMBLE = `// This file is part of EH-WebComponents, Copyright (C) Todd D. Esposito 2021.
// Distributed under the MIT License (see https://opensource.org/licenses/MIT).
`

if (! fs.existsSync('build')) { fs.mkdirSync('build') }

glob("src/*.js", (err, files) => {
  files.map(async (f) => {
    let content = fs.readFileSync(f).toString()
    let target = f.replace("src/", "build/").replace(".js", `-${config.version}.min.js`)
    console.log(`Processing ${f} into ${target}`)
    //  find the HTML block (look for <!-- ##HTML --> and <!-- ##/HTML -->)
    let htmlstart = content.search(HTML_START_TAG), htmlend = content.search(HTML_END_TAG)
    if (htmlstart >= 0 && htmlend > htmlstart) {
      content = content.substring(0, htmlstart) +
        htmlmin(content.substring(htmlstart, htmlend + HTML_END_TAG.length), {
          collapseWhitespace: true,
          minifyCSS: true,
          removeComments: true,
          removeTagWhitepace: true,
        }) +
        content.substring(htmlend + HTML_END_TAG.length)
    }
    let result = await minify(content)
    fs.writeFileSync(target, PREAMBLE + result.code)
  })
})
