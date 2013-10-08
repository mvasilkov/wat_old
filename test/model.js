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
    })

    it('should resolve defaults', function () {
        var f = iosys.finder(__dirname + '/a', __dirname + '/b')
        model.init(f)

        var p = model.get('p1')
        assert.equal(p.r, 'p1a.txt')

        p = model.get('p2')
        assert.equal(p.r, 'p2a.txt')

        p = model.get('p3')
        assert.equal(p.r, 'p3b.txt')
    })
})
