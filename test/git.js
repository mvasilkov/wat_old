var should = require('should'),
    git = require('../lib/git')

describe('git', function () {
    it('should be usable', function (done) {
        this.timeout(500)
        git.usable(done)
    })
})
