var assert = require('assert'),
    util = require('../lib/util')

function reject(a) { if (a) assert.fail(a, 'nil', '', '->') }

describe('util', function () {
    it('should provide isDir', function () {
        assert(util.isDir('/bin'))    // dir
        reject(util.isDir('/bin/sh')) // file
        reject(util.isDir('/WINNT'))  // n/a
    })

    it('should provide isFile', function () {
        reject(util.isFile('/bin'))    // dir
        assert(util.isFile('/bin/sh')) // file
        reject(util.isFile('/WINNT'))  // n/a
    })
})
