var fs = require('fs'),
    mediatype = require('mediatype'),
    ms = require('./ms')

function pages(finder) {
    function readFile(type) {
        type = mediatype.get(type)
        return function(p, res, next) {
            var f = finder(p.payload)
            if (f) {
                res.set('Content-Type', type)
                fs.createReadStream(f).pipe(res)
            }
            else next()
        }
    }

    var handlers = {
        html: readFile('html'),
        txt: readFile('txt')
    }

    return function (req, res, next) {
        var p = ms.get(req.url.substr(1))
        if (p && handlers.hasOwnProperty(p.type))
            handlers[p.type](p, res, next)
        else next()
    }
}

module.exports.pages = pages
