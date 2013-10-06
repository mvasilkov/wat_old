var fs = require('fs'),
    fmt = require('rssi'),
    mediatype = require('mediatype'),
    model = require('./model')

function pages(finder) {
    function read(p, res, next) {
        var f = finder('pages/' + p.r)
        if (f) {
            res.set('Content-Type', mediatype.lookup(f))
            fs.createReadStream(f).pipe(res)
        }
        else next()
    }

    function wrap(p, res, next) {
        var f = finder('pages/' + p.r),
            g = finder('_wat/' + p.rt)
        if (f && g) {
            fs.readFile(f, {encoding: 'utf-8'}, function (err, ff) {
                fs.readFile(g, {encoding: 'utf-8'}, function (err, gg) {
                    res.set('Content-Type', mediatype.lookup(g))
                    res.end(fmt(gg)({text: ff}))
                })
            })
        }
        else next()
    }

    model.init(finder)

    return function (req, res, next) {
        var p = model.get(req.url.substr(1))
        if (p && p.hasOwnProperty('r'))
            (p.hasOwnProperty('rt')? wrap: read)(p, res, next)
        else next()
    }
}

module.exports.pages = pages
