var assert = require('assert'),
    git = require('../lib/git')

function reject(a) { if (a) assert.fail(a, 'nil', '', '->') }

describe('git', function () {
    it('should be usable', function (done) {
        this.timeout(500)
        git.usable(done)
    })

    it('should provide isRepo', function () {
        assert(git.isRepo(process.cwd()))
        reject(git.isRepo('/bin'))
        reject(git.isRepo('/shrubbery'))
    })
})
