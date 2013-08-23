var child_process = require('child_process')

function usable(fn) {
    child_process.exec('git help', function (err) {
        if (err) console.error('wat: git is not usable')
        else fn()
    })
}

module.exports = {
    usable: usable
}
