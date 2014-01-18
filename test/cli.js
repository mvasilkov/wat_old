var assert = require('assert'),
    childProcess = require('child_process')

function cmdEqual(cmd, res, done) {
    childProcess.exec(cmd, function (err, stdout, stderr) {
        assert.equal(stdout || stderr, res)
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
})
