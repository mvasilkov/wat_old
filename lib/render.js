var fs = require('fs'),
    mediatype = require('mediatype'),
    model = require('./model')

function pages(finder) {
    function readFile(p, res, next) {
        var f = finder('pages/' + p.read)
        if (f) {
            res.set('Content-Type', mediatype.lookup(f))
            fs.createReadStream(f).pipe(res)
        }
        else next()
    }

    return function (req, res, next) {
        var p = model.get(req.url.substr(1))
        if (p && p.hasOwnProperty('read'))
            readFile(p, res, next)
        else next()
    }
}

module.exports.pages = pages
