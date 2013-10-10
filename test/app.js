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

    it('should have favicon.ico', function (done) {
        req
            .get('/favicon.ico')
            .expect('content-type', 'image/x-icon')
            .expect('content-length', '1150')
            .expect('cache-control', 'public, max-age=9000000')
            .expect(200, done)
    })

    it('should have robots.txt', function (done) {
        req
            .get('/robots.txt')
            .expect('content-type', 'text/plain')
            .expect('content-length', '24')
            .expect('cache-control', 'public, max-age=9000000')
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

    it('should set Content-Length header', function (done) {
        req
            .get('')
            .expect('content-length', '257')
            .expect(200, done)
    })

    it('should set Content-Length header-2', function (done) {
        req
            .get('/license.txt')
            .expect('content-length', '1111')
            .expect(200, done)
    })
})
