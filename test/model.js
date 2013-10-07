var assert    = require('assert'),
    iosys     = require('iosys'),
    mediatype = require('mediatype'),
    model     = require('../lib/model')

describe('model', function () {
    beforeEach(model.reset)

    it('should provide defaults', function () {
        var f = iosys.finder(process.cwd())
        model.init(f)

        var p = model.get('')
        assert(p && p.r)
        assert.equal(mediatype.lookup(p.rt || p.r), 'text/html')

        p = model.get('robots.txt')
        assert(p && p.r)
        assert.equal(mediatype.lookup(p.rt || p.r), 'text/plain')
    })
})
