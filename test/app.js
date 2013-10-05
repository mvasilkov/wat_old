var assert  = require('assert'),
    request = require('supertest'),
    start   = require('../app').start

describe('app', function () {
    function eq(a, b) { assert.strictEqual(a, b) }

    var app = start({nop: true}),
        req = request(app)

    it('should have a start page', function (done) {
        req
            .get('')
            .expect('content-type', 'text/html')
            .expect(200, done)
    })

    it('should have robots.txt', function (done) {
        req
            .get('/robots.txt')
            .expect('content-type', 'text/plain')
            .expect(200, done)
    })

    it('must not use X-Powered-By header', function (done) {
        req
            .get('')
            .end(function (err, res) {
                eq(res.get('x-powered-by'))
                done(err)
            })
    })
})
