var child_process = require('child_process'),
    iosys = require('iosys')

function usable(fn) {
    child_process.exec('git help', function (err) {
        if (err) console.error('wat: git is not usable')
        else fn()
    })
}

function isRepo(path) {
    /* jshint laxbreak: true */
    return iosys.is.dir(path + '/.git')
        && iosys.is.dir(path + '/.git/objects')
        && iosys.is.dir(path + '/.git/refs')
}

module.exports = {
    usable: usable,
    isRepo: isRepo
}
