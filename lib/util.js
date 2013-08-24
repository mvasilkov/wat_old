var fs = require('fs')

function isDir(path) {
    try { return fs.statSync(path).isDirectory() }
    catch (err) { return null }
}

module.exports = {
    isDir: isDir
}
