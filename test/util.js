var should = require('should'),
    util = require('../lib/util')

describe('util', function () {
    it('should provide isDir', function () {
        should.exist(util.isDir('/bin'))
        should.not.exist(util.isDir('/WINNT'))
    })
})
