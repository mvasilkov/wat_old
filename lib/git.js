var child_process = require('child_process'),
    util = require('./util')

function usable(fn) {
    child_process.exec('git help', function (err) {
        if (err) console.error('wat: git is not usable')
        else fn()
    })
}

function isRepo(path) {
    /* jshint laxbreak: true */
    return util.isDir(path + '/.git')
        && util.isDir(path + '/.git/objects')
        && util.isDir(path + '/.git/refs')
}

module.exports = {
    usable: usable,
    isRepo: isRepo
}
