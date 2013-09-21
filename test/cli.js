var should = require('should'),
    child_process = require('child_process')

function cmdEqual(cmd, res, done) {
    child_process.exec(cmd, function (err, stdout, stderr) {
        (stdout || stderr).should.equal(res)
        done(err)
    })
}

describe('cli', function () {
    var cwd = process.cwd()

    it('should accept -r <dir>', function (done) {
        cmdEqual('node app.js -N -r ' + cwd, 'wat: ' + cwd + '\n', done)
    })

    it('should default to current dir', function (done) {
        cmdEqual('node app.js -N', 'wat: ' + cwd + '\n', done)
    })

    it('should test for git repo', function (done) {
        cmdEqual('node app.js -r node_modules', 'wat: err\n', done)
    })
})
