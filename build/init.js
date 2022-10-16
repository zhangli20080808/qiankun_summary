const fs = require("fs");
const filePath = require('./filePath')
const runShellSync = require('./util').runShellSync

const isForce = process.argv[2]

if (isForce) {
  cleanNodeModules()
}

// node 版本 v14.17.0
runShellSync(`nvm use v14.17.0`);

Object.keys(filePath).forEach(item => {
  hasNodeModules(filePath[item])
})

function cleanNodeModules() {
  Object.keys(filePath).forEach(item => {
    runShellSync(`rm -rf ${filePath[item]}/node_modules`)
  })
}

function hasNodeModules(path) {
  const isExit = fs.readdirSync(path).includes('node_modules')
  if (!isExit) {
    runShellSync(`cd ${path} && npm install`)
  }
}

