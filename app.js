var package = require('./package.json'),
    path = require('path'),
    program = require('commander'),
    git = require('./lib/git')

function main() {
    program
        .option('-r, --repo <dir>', 'git repository to use',
                path.resolve, process.cwd())
        .version(package.version)
        .parse(process.argv)

    if (git.isRepo(program.repo))
        console.log('wat:', program.repo)
    else
        console.error('wat: err')
}

if (require.main === module) {
    git.usable(main)
}
