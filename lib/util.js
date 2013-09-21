var fs = require('fs')

function isFn(method) {
    return function (path) {
        try { return fs.statSync(path)[method]() }
        catch (err) { return null }
    }
}

function finder() {
    var args = Array.prototype.slice.call(arguments)

    return function (filename) {
        var res = null
        args.some(function (path) {
            var test = path + '/' + filename
            if (module.exports.isFile(test)) {
                res = test
                return true
            }
        })
        return res
    }
}

module.exports = {
    isDir: isFn('isDirectory'),
    isFile: isFn('isFile'),
    finder: finder
}
