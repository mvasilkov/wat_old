var assert = require('assert'),
    ms = require('../lib/ms')

describe('ms', function () {
    it('should provide defaults', function () {
        var start = ms.get('')
        assert(start)
        assert.equal(start.type, 'html')
    })
})
