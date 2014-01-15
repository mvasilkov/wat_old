var package = require('./package.json'),
    path    = require('path'),
    program = require('commander'),
    express = require('express'),
    iosys   = require('iosys'),
    aux     = require('./lib/aux'),
    render  = require('./lib/render'),
    git     = require('./lib/git')

function start(options) {
    var app = express(),
        finder = iosys.finder(options.repo, __dirname)

    app.disable('x-powered-by')
    app.use(express.logger('dev'))
    app.use(aux(finder))
    app.use(render(finder))

    var pub = '/pub'
    app.use(pub, express.static(options.repo + pub))
    app.use(pub, express.static(__dirname + pub))

    if (options.nop) return app

    app.listen(options.port, options.bind)
}

function cli() {
    program
        .option('-r, --repo <dir>', 'git repository to use (default .)',
                path.resolve, process.cwd())
        .option('-p, --port <num>', 'port to listen on (default 9000)',
                parseInt, 9000)
        .option('-b, --bind <ip>', 'IP address to bind to (default 0.0.0.0)',
                '0.0.0.0')
        .option('-N, --nop', 'do nothing')
        .version(package.version)
        .parse(process.argv)

    /* jshint -W030 */
    if (git.isRepo(program.repo))
        console.log('wat:', program.repo)
    else
        console.error('wat: err'), process.exit()

    start(program)
}

function main() { git.usable(cli) }

if (require.main === module) main()

module.exports.main = main
module.exports.start = start
