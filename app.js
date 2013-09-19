var package = require('./package.json'),
    path    = require('path'),
    program = require('commander'),
    express = require('express'),
    git     = require('./lib/git')

function start() {
    var app = express()
    app.listen(9000)
}

function cli() {
    program
        .option('-r, --repo <dir>', 'git repository to use',
                path.resolve, process.cwd())
        .option('-N, --nop', 'do nothing')
        .version(package.version)
        .parse(process.argv)

    /* jshint expr: true */
    if (git.isRepo(program.repo))
        console.log('wat:', program.repo)
    else
        console.error('wat: err'), process.exit()

    program.nop || start()
}

function main() { git.usable(cli) }

if (require.main === module) main()

exports.main = main
