var git = require('./lib/git')

function main() {
    console.log('wat')
}

if (require.main === module) {
    git.usable(main)
}
