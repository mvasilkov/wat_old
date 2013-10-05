var assert = require('assert'),
    mediatype = require('mediatype'),
    model = require('../lib/model')

describe('model', function () {
    it('should provide defaults', function () {
        var p = model.get('')
        assert(p && p.r)
        assert.equal(mediatype.lookup(p.rt || p.r), 'text/html')

        p = model.get('robots.txt')
        assert(p && p.r)
        assert.equal(mediatype.lookup(p.rt || p.r), 'text/plain')
    })
})
