var fs = require('fs')

function isFn(method) {
    return function (path) {
        try { return fs.statSync(path)[method]() }
        catch (err) { return null }
    }
}

module.exports = {
    isDir: isFn('isDirectory'),
    isFile: isFn('isFile')
}
