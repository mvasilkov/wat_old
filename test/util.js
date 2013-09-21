var assert = require('assert'),
    util = require('../lib/util')

function reject(a) { if (a) assert.fail(a, 'nil', '', '->') }

describe('util', function () {
    it('should provide isDir', function () {
        assert(util.isDir('/bin'))     // dir
        reject(util.isDir('/bin/sh'))  // file
        reject(util.isDir('/ninjacy')) // n/a
    })

    it('should provide isFile', function () {
        reject(util.isFile('/bin'))     // dir
        assert(util.isFile('/bin/sh'))  // file
        reject(util.isFile('/jesusry')) // n/a
    })

    describe('finder', function () {
        var dir = process.cwd(),
            f = util.finder(dir + '/bin', dir + '/lib', dir + '/test')

        it('should find files', function () {
            assert.equal(f('wat'), dir + '/bin/wat')
            assert.equal(f('git.js'), dir + '/lib/git.js')
            assert.equal(f('cli.js'), dir + '/test/cli.js')
            reject(f('app.js'))
            reject(f('autoexec.bat'))
        })
    })
})
