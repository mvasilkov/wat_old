var package = require('./package.json'),
    path    = require('path'),
    program = require('commander'),
    express = require('express'),
    git     = require('./lib/git')

function start(options) {
    var app = express()

    if (options.nop) return app

    app.listen(options.port)
}

function cli() {
    program
        .option('-r, --repo <dir>', 'git repository to use',
                path.resolve, process.cwd())
        .option('-p, --port <num>', 'port to listen on',
                parseInt, 9000)
        .option('-N, --nop', 'do nothing')
        .version(package.version)
        .parse(process.argv)

    /* jshint expr: true */
    if (git.isRepo(program.repo))
        console.log('wat:', program.repo)
    else
        console.error('wat: err'), process.exit()

    start(program)
}

function main() { git.usable(cli) }

if (require.main === module) main()

module.exports.start = start
