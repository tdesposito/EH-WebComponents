const fs = require('fs')

var name = process.argv.slice(2, 3)

if (name.length === 0 || name[0].startsWith('eh-') || name[0].endsWith('.js')) {
  console.log("Please specify the component tag name without 'eh-' prefix or suffix.")
} else {
  name = name[0]
  var className = name.split("-").map(c => c[0].toUpperCase() + c.substring(1)).join("")
  var target = `src/eh-${name}.js`
  if (fs.existsSync(target)) {
     console.log(`Can't continue: ${target} already exists.`)
  } else {
    console.log(`creating class Eh${className} in ${target} implementing <eh-${name}>`)
    var content = fs.readFileSync("scripts/template-js")
      .toString()
      .replace('{{!!TagName!!}}', name)
      .replace('{{!!ClassName!!}}', className)
    fs.writeFileSync(target, content)
  }
}
