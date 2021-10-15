const { execSync } = require('child_process')
const fs = require('fs')
const glob = require('glob')

function run(cmd) {
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
run('git add dist/*')
run('git commit -m "update dist files"')

// update and commit the changelog
run('git-changelog . -o CHANGELOG.md')
run('git add CHANGELOG.md')
run('git commit -m "update changelog"')
run('npm version minor')
run('git push')
run('git push --tags')
