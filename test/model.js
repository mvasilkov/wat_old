var assert = require('assert'),
    mediatype = require('mediatype'),
    model = require('../lib/model')

describe('model', function () {
    it('should provide defaults', function () {
        var p = model.get('')
        assert(p && p.read)
        assert.equal(mediatype.lookup(p.read), 'text/html')

        p = model.get('robots.txt')
        assert(p && p.read)
        assert.equal(mediatype.lookup(p.read), 'text/plain')
    })
})
