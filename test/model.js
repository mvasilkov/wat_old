var assert = require('assert'),
    model = require('../lib/model')

describe('model', function () {
    it('should provide defaults', function () {
        var start = model.get('')
        assert(start)
        assert.equal(start.type, 'html')
    })
})
