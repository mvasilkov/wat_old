var fs = require('fs'),
    ms = require('./ms')

function pages(finder) {
    return function (req, res, next) {
        var p = ms.get(req.url.substr(1))
        if (p) {
            var f = finder('pages/' + p.payload)
            fs.createReadStream(f).pipe(res)
        }
        else next()
    }
}

module.exports.pages = pages
