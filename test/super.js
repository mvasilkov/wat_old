var request = require('supertest'),
    start = require('../app').start

describe('app', function () {
    var app = start({nop: true})

    it('should have a start page', function (done) {
        request(app)
            .get('')
            .expect('content-type', 'text/html')
            .expect(200, done)
    })
})
