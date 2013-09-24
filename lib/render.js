var fs = require('fs'),
    ms = require('./ms')

function pages(finder) {
    var handlers = {
        html: function(p, res, next) {
            var f = finder(p.payload)
            if (f) {
                res.setHeader('Content-Type', 'text/html')
                fs.createReadStream(f).pipe(res)
            }
            else next()
        }
    }

    return function (req, res, next) {
        var p = ms.get(req.url.substr(1))
        if (p && handlers.hasOwnProperty(p.type))
            handlers[p.type](p, res, next)
        else next()
    }
}

module.exports.pages = pages
