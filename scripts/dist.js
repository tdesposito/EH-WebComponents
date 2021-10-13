const { execSync } = require('child_process')
const fs = require('fs')
const glob = require('glob')

function doExec(cmd) {
  console.log(`Running '${cmd}'...`)
  execSync(cmd, {stdio: 'inherit'})
}

if (! fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

glob("+(build|bundle)/*.min.js", (err, files) => {
  files.map(async (f) => {
    console.log(`copy ${f} to dist/`)
    var target = f.replace('build/', 'dist/').replace('bundle/', 'dist/')
    fs.copyFileSync(f, target)
  })
})

// git add and git commit the dist files
doExec('git add dist/*')
doExec('git commit -m "update dist files"')

// update and commit the changelog
doExec('git-changelog . -o CHANGELOG.md')
doExec('git add CHANGELOG.md')
doExec('git commit -m "update changelog"')
doExec('npm version minor')
doExec('git add package.json')

let pkg = require('./package.json')
doExec(`git commit -m "bump version to ${pkg.version}"`)
doExec(`git tag v${pkg.version}`)
doExec('git push')
doExec('git push --tags')
